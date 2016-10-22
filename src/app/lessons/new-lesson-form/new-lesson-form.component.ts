import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonsService} from "../../shared/services/lessons.service";
import {Location} from "@angular/common";
import {Message} from "../../shared/model/message";

@Component({
    selector: 'jo-tut-new-lesson-form',
    templateUrl: './new-lesson-form.component.html',
    styleUrls: ['./new-lesson-form.component.css']
})
export class NewLessonFormComponent implements OnInit {

    private courseKey: string;
    private message: Message = null;

    constructor(private _route: ActivatedRoute,
                private _location: Location,
                private _lessonsService: LessonsService) {
    }

    ngOnInit() {
        this.courseKey = this._route.snapshot.queryParams["courseKey"];
    }

    onSave(form): void {

        this._lessonsService.createLesson(this.courseKey, form.value)
            .subscribe(
                next => {
                    this.message = new Message("S", "Lesson successfully created.");
                    form.reset();
                },
                error => {
                    this.message = new Message("E", `Error creating lesson: ${error}`);
                }
            );
    }

    onBack() {
        this._location.back();
    }

}
