import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy} from "@angular/core";
import {LessonsService} from "../shared/services/lessons.service";
import {Observable, Subscription} from "rxjs";
import {Lesson} from "../shared/model/lesson";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/do";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/observable/fromEvent";

@Component({
    selector: 'jo-tut-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('input', {read: ElementRef}) searchButton: ElementRef;

    private allLessons$: Observable<Lesson[]>;
    private filteredLessons$: Observable<Lesson[]>;

    private _search: Subscription;

    constructor(private _lessonsService: LessonsService) {
    }

    ngOnInit() {
        this.allLessons$ = this.filteredLessons$ = this._lessonsService.findAllLessons();
    }

    ngAfterViewInit(): void {

        this._search = Observable.fromEvent(this.searchButton.nativeElement, "keyup")
            .debounceTime(300)
            .map((ev: any) => ev.target.value)
            .distinctUntilChanged()
            .do((value: string) => {
                this.filteredLessons$ = this.allLessons$
                    .map(lessons => lessons.filter(lesson => lesson.description.includes(value)));
            })
            .subscribe();
    }


    ngOnDestroy(): void {
        this._search.unsubscribe();
    }
}
