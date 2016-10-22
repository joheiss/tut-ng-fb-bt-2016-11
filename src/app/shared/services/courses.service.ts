import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {Lesson} from "../model/lesson";
import "rxjs/add/operator/map";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class CoursesService {

    constructor(private _db: AngularFireDatabase) {
    }

    findAllCourses(): Observable<Course[]> {

        return this._db.list("courses")
            .map(Course.fromJsonList);
    }

    findAllLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
        return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseByUrl(courseUrl));
    }

    loadFirstLessonsPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {

        const lessonKeys$ = this.findLessonKeysPerCourseByUrl(courseUrl, {
            query: {
                orderByKey: true,
                limitToFirst: pageSize
            }
        });

        return this.findLessonsForLessonKeys(lessonKeys$);
    }

    loadNextLessonsPage(courseUrl: string, startAt: string, pageSize: number): Observable<Lesson[]> {

        const lessonKeys$ = this.findLessonKeysPerCourseByUrl(courseUrl, {
            query: {
                orderByKey: true,
                startAt: startAt,
                limitToFirst: pageSize + 1
            }
        });

        return this.findLessonsForLessonKeys(lessonKeys$)
            .map(lessons => lessons.slice(1, lessons.length));
    }

    loadPreviousLessonsPage(courseUrl: string, endAt: string, pageSize: number): Observable<Lesson[]> {

        const lessonKeys$ = this.findLessonKeysPerCourseByUrl(courseUrl, {
            query: {
                orderByKey: true,
                endAt: endAt,
                limitToLast: pageSize + 1
            }
        });

        return this.findLessonsForLessonKeys(lessonKeys$)
            .map(lessons => lessons.slice(0, lessons.length - 1));
    }

    findLessonKeysPerCourseByUrl(courseUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {

        return this.findCourseByUrl(courseUrl)
            .filter(course => !!course)
            .switchMap((course: any) => this._db.list(`lessonsPerCourse/${course.$key}`, query))
            .map(lessonsPerCourse => lessonsPerCourse.map(lessonPerCourse => lessonPerCourse.$key));
    }

    findCourseByUrl(courseUrl: string): Observable<Course> {

        return this._db.list("courses", {
            query: {
                orderByChild: "url",
                equalTo: courseUrl
            }
        })
            .map(results => results[0]);
    }

    findLessonsForLessonKeys(lessonKeys$: Observable<string[]>): Observable<Lesson[]> {

        return lessonKeys$
            .map(lessonKeys => lessonKeys.map(lessonKey => this._db.object(`lessons/${lessonKey}`)))
            .flatMap(fbos => Observable.combineLatest(fbos));
    }
}
