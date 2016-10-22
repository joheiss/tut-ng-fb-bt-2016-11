import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../shared/services/courses.service";
import {Observable} from "rxjs";
import {Course} from "../../shared/model/course";

@Component({
    selector: 'jo-tut-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

    private courses$: Observable<Course[]>;

    constructor(private _coursesService: CoursesService) {
    }

    ngOnInit() {
        this.courses$ = this._coursesService.findAllCourses();
    }
}
