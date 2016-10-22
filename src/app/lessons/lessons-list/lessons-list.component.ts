import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {LessonDTO} from "../../shared/model/lessonDTO";
import {Lesson} from "../../shared/model/lesson";

@Component({
    selector: 'jo-tut-lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonsListComponent implements OnInit {

    @Input() private lessons: Lesson[];

    @Output() private selected = new EventEmitter<Lesson>();

    constructor() {
    }

    ngOnInit() {
    }

    onSelect(lesson: Lesson): void {
        this.selected.emit(lesson);

    }
}
