import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Lesson} from "../../shared/model/lesson";
import {LessonsService} from "../../shared/services/lessons.service";
import {Message} from "../../shared/model/message";

@Component({
    selector: 'jo-tut-edit-lesson-form',
    templateUrl: './edit-lesson-form.component.html',
    styleUrls: ['./edit-lesson-form.component.css']
})
export class EditLessonFormComponent implements OnInit {

    private lesson: Lesson;
    private message: Message = null;

    constructor(private _route: ActivatedRoute,
                private _location: Location,
                private _lessonsService: LessonsService) {

        _route.data
            .subscribe(data => this.lesson = data["lesson"]);
    }

    ngOnInit() {
    }

    onSave(data): void {

        this._lessonsService.updateLesson(this.lesson.$key, data)
            .subscribe(
                next => this.message = new Message("S", "Lesson updated successfully."),
                error => this.message = new Message("E", `Error while updating lesson: ${error}`)
            );
    }

    onBack(): void {
        this._location.back();
    }
}
