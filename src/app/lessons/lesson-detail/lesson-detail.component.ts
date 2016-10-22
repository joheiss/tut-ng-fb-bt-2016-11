import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../../shared/services/lessons.service";
import {Lesson} from "../../shared/model/lesson";
import {Subscription} from "rxjs";
import {Location} from "@angular/common";
import {Message} from "../../shared/model/message";

@Component({
    selector: 'jo-tut-lesson-detail',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css']
})

export class LessonDetailComponent implements OnInit, OnDestroy {

    private lesson: Lesson;
    private message: Message = null;

    private _lessonSub: Subscription;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _location: Location,
                private _lessonsService: LessonsService) {
    }

    ngOnInit(): void {

        this._lessonSub = this._route.params
            .switchMap(params => this._lessonsService.findLessonByUrl(params["id"]))
            .do(console.log)
            .subscribe((lesson: Lesson) => this.lesson = lesson);
    }

    ngOnDestroy(): void {
        this._lessonSub.unsubscribe();
    }

    onNext(lesson: Lesson): void {
        console.log("onNext: ", lesson.courseId, lesson.$key);
        this._lessonsService.loadNextLesson(lesson.courseId, lesson.$key)
            .do(lesson => console.log("Next lesson: ", lesson.url))
            .subscribe(
                next => this.navigateToLesson(next),
                console.error
            );
    }

    onPrevious(lesson: Lesson): void {

        this._lessonsService.loadPreviousLesson(lesson.courseId, lesson.$key)
            .do(lesson => console.log("Previous lesson: ", lesson.url))
            .subscribe(
                next => this.navigateToLesson(next),
                console.error
            );
    }

    onBack(): void {
        this._location.back();
    }

    onDelete(): void {
        this._lessonsService.deleteLesson(this.lesson.$key, this.lesson.courseId)
            .subscribe(
                next => alert(`Lesson ${this.lesson.$key} has been deleted.`),
                console.error
            );
    }

    onDeleteViaRest(): void {
        this._lessonsService.deleteLessonViaRest(this.lesson.$key, this.lesson.courseId)
            .subscribe(
                next => alert(`Lesson ${this.lesson.$key} has been deleted.`),
                console.error
            );
    }

    onDeleteRequest(): void {

        // sometimes there is no course id maintained in a lesson - don't allow delete requests for them
        if (!this.lesson.courseId) {
            alert("Lesson cannot be deleted via request because of missing course assignment!");

        } else {
            this._lessonsService.requestLessonDeletion(this.lesson.$key, this.lesson.courseId)
                .subscribe(
                    next => alert(`Deletion of lesson ${this.lesson.$key} has been requested.`),
                    console.error
                );
        }
    }

    private navigateToLesson(lesson: Lesson): void {

        if (lesson && lesson.url) {
            this._router.navigate(["lessons", lesson.url]);
        } else {
            this.message = new Message("E", "Could not navigate to lesson. Please check your data.");
        }
    }
}
