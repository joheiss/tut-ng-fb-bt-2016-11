import {Injectable, Inject} from "@angular/core";
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Observable, Subject} from "rxjs";
import "rxjs/add/operator/map";
import {Lesson} from "../model/lesson";
import {Http} from "@angular/http";
import {firebaseConfig} from "../../../environments/firebase.config";

@Injectable()
export class LessonsService {

    private sdkDb: any;

    constructor(private _db: AngularFireDatabase,
                private _http: Http,
                @Inject(FirebaseRef) fb) {

        this.sdkDb = fb.database().ref();
    }

    findAllLessons(): Observable<Lesson[]> {

        return this._db.list("lessons")
            .map(Lesson.fromJsonList);
    }

    findLessonByUrl(lessonUrl: string): Observable<Lesson> {

        return this._db.list("lessons", {
            query: {
                orderByChild: "url",
                equalTo: lessonUrl
            }
        })
            .filter(results => results && results.length > 0)
            .map(results => Lesson.fromJson(results[0]));
    }

    loadNextLesson(courseKey: string, lessonKey: string): Observable<Lesson> {

        return this._db.list(`lessonsPerCourse/${courseKey}`, {
            query: {
                orderByKey: true,
                startAt: lessonKey,
                limitToFirst: 2
            }
        })
            .filter(results => results && results.length > 1)
            .map(results => results[1].$key)
            .switchMap(lessonKey => this._db.object(`lessons/${lessonKey}`))
            .map(Lesson.fromJson);
    }

    loadPreviousLesson(courseKey: string, lessonKey: string): Observable<Lesson> {

        return this._db.list(`lessonsPerCourse/${courseKey}`, {
            query: {
                orderByKey: true,
                endAt: lessonKey,
                limitToLast: 2
            }
        })
            .filter(results => results && results.length > 1)
            .map(results => results[0].$key)
            .switchMap(lessonKey => this._db.object(`lessons/${lessonKey}`))
            .map(Lesson.fromJson);
    }

    createLesson(courseKey: string, lesson: any): Observable<any> {

        const lessonToSave = Object.assign({}, lesson, {courseId: courseKey});
        const newLessonKey = this.sdkDb.child("lessons").push().key;

        let dataToSave = {};
        dataToSave[`lessons/${newLessonKey}`] = lessonToSave;
        dataToSave[`lessonsPerCourse/${courseKey}/${newLessonKey}`] = true;

        return this.firebaseUpdate(dataToSave);
    }

    updateLesson(lessonKey: string, lesson: any): Observable<any> {

        const lessonToSave = Object.assign({}, lesson);

        delete(lessonToSave.$key);
        Object.keys(lessonToSave).forEach(key => {
            if (!lessonToSave[key]) {
                delete(lessonToSave[key]);
            }
        });

        let dataToSave = {};
        dataToSave[`lessons/${lessonKey}`] = lessonToSave;

        return this.firebaseUpdate(dataToSave);
    }

    firebaseUpdate(dataToSave: any): Observable<any> {

        const subject = new Subject();

        this.sdkDb.update(dataToSave)
            .then(
                resolve => {
                    subject.next(resolve);
                    subject.complete();
                },
                reject => {
                    subject.error(reject);
                    subject.complete();
                }
            );

        return subject.asObservable();
    }

    deleteLesson(lessonKey: string, courseKey: string): Observable<any> {

        const promiseDeleteLesson = this._db.list("lessons")
            .remove(lessonKey);

        // sometimes course id is not filled on lesson - if that is the case only delete lesson not link to course
        if (courseKey) {
            const promiseDeleteLessonPerCourse = this._db.list("lessonsPerCourse")
                .remove(`${courseKey}/${lessonKey}`);
            const promise = Promise.all([promiseDeleteLesson, promiseDeleteLessonPerCourse])
                .then(resolve => resolve)
                .catch(reject => reject);
            return Observable.fromPromise(promise as Promise<any>);
        } else {
            return Observable.fromPromise(promiseDeleteLesson as Promise<any>);
        }
    }

    deleteLessonViaRest(lessonKey: string, courseKey: string): Observable<any> {

        const lessonsPerCourseUrl = `${firebaseConfig.databaseURL}/lessonsPerCourse/${courseKey}/${lessonKey}.json`;
        const lessonUrl = `${firebaseConfig.databaseURL}/lessons/${lessonKey}.json`;

        return Observable.concat(this._http.delete(lessonUrl), this._http.delete(lessonsPerCourseUrl));
    }

    requestLessonDeletion(lessonKey: string, courseKey: string): Observable<any> {

        const promise = this.sdkDb.child("queue/tasks").push({lessonKey, courseKey})
            .then(resolve => resolve);

        return Observable.fromPromise(promise as Promise<any>);
    }
}
