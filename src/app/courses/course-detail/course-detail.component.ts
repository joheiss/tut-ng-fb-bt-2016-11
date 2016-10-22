import {Component, OnInit, OnDestroy} from "@angular/core";
import {CoursesService} from "../../shared/services/courses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Lesson} from "../../shared/model/lesson";
import {Course} from "../../shared/model/course";
import {Subscription} from "rxjs";
import {Message} from "../../shared/model/message";

@Component({
    selector: 'jo-tut-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit, OnDestroy {

    static readonly PAGESIZE: number = 5;

    private courseUrl: string;
    private course: Course;
    private lessons: Lesson[];

    private message: Message = null;
    private _previous: boolean;
    private _next: boolean;

    private _courseSub: Subscription;
    private _lessonPageSub: Subscription;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _coursesService: CoursesService) {
    }

    ngOnInit(): void {

        this.courseUrl = this._route.snapshot.params["id"];

        this._courseSub = this._coursesService.findCourseByUrl(this.courseUrl)
            .subscribe(course => this.course = course);

        this._lessonPageSub = this._coursesService.loadFirstLessonsPage(this.courseUrl, CourseDetailComponent.PAGESIZE)
            .subscribe(lessons => {
                this._handlePaginationButtons("first", lessons.length);
                this.lessons = lessons;
            });
    }


    ngOnDestroy(): void {
        this._courseSub.unsubscribe();
        this._lessonPageSub.unsubscribe();
    }

    onNextPage(): void {

        this._lessonPageSub.unsubscribe(); // this is only to work around an angularfire2 bug (alpha-5) - issue #576

        this._lessonPageSub = this._coursesService.loadNextLessonsPage(
            this.courseUrl,
            this.lessons[this.lessons.length - 1].$key,
            CourseDetailComponent.PAGESIZE
        )
            .subscribe(
                lessons => {
                    this._handlePaginationButtons("next", lessons.length);
                    if (lessons.length > 0) {
                        this.lessons = lessons;
                        this.message = null;
                    } else {
                        this.message = new Message("W", "You have already reached the last page.");
                    }
                });
    }

    onPreviousPage(): void {

        this._lessonPageSub.unsubscribe(); // this is only to work around an angularfire2 bug (alpha-5) - issue #576

        this._lessonPageSub = this._coursesService.loadPreviousLessonsPage(
            this.courseUrl,
            this.lessons[0].$key,
            CourseDetailComponent.PAGESIZE
        )
            .subscribe(lessons => {
                this._handlePaginationButtons("prev", lessons.length);
                if (lessons.length > 0) {
                    this.lessons = lessons;
                    this.message = null;
                } else {
                    this.message = new Message("W", "You have already reached the first page.");
                }
            });
    }

    navigateToLesson(lesson: Lesson): void {
        this._router.navigate(['lessons', lesson.url]);
    }

    private _handlePaginationButtons(action: string, length: number) {

        // console.log("Handle Pagination: ", action, length, this.lessons ? this.lessons.length : 99);

        if (length === CourseDetailComponent.PAGESIZE) {
            this._next = true;
        }

        if (action === "next") {
            if (length > 0) {
                this._previous = true;
            } else {
                this._next = false;
            }
        }

        if (action === "prev") {
            if (length > 0) {
                this._next = true;
            } else {
                this._previous = false;
            }
        }
    }
}
