import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/first';

@Injectable()
export class App1Service {

    courses$: FirebaseListObservable<any>;
    course$: FirebaseObjectObservable<any>;
    lesson$: FirebaseObjectObservable<any>;

    courseToRemove: any;
    courseToUpdate: any;

    constructor(private _af: AngularFire) {

        this._readCoursesList();
        this._readCourseObject();
        this._readLessonObject();

        this._retrieveFirstElementOfList();
        this._retrieveSecondElementOfList();

    }

    pushToList(): boolean {

        this.courses$.push({
            description: "TEST: PUSH NEW COURSE ON LIST"
        })
            .then(
                () => console.log("Push was successful"),
                console.error
            );
        return false;
    }

    removeFromList(): boolean {

        console.log(this.courseToRemove);

        this.courses$.remove(this.courseToRemove)
            .then(
                () => console.log("Remove was successful"),
                console.error
            );

        return false;
    }

    updateList() {

        this.courses$.update(this.courseToUpdate, {description: this.courseToUpdate.description + " **UPDATED**"})
            .then(
                () => console.log("Update was successful"),
                console.error
            );
        return false;
    }

    updateObject() {

        this.lesson$.update({description: " **OBJECT UPDATED** "})
            .then(
                () => console.log("Object update was successful"),
                console.error
            );
        return false;
    }

    setObject() {

        this.lesson$.set({description: " **OBJECT UPDATED** "})
            .then(
                () => console.log("Object set was successful"),
                console.error
            );
        return false;
    }

    removeObject() {

        this.lesson$.remove()
            .then(
                () => console.log("Object remove was successful"),
                console.error
            );
        return false;
    }

    private _readCoursesList(): void {

        this.courses$ = this._af.database.list('courses');
        this.courses$.subscribe(console.log);
    }

    private _readCourseObject(): void {

        this.course$ = this._af.database.object('courses/-KTyNa_qwMxdu-lVyCQD');
        this.course$.subscribe(console.log);
    }

    private _readLessonObject(): void {

        this.lesson$ = this._af.database.object('lessons/-KTyNa_Y7iEdNL25RlK2');
        this.lesson$.subscribe(console.log);
    }

    private _retrieveFirstElementOfList(): void {

        this.courses$
            .switchMap(courses => courses)
            .first()
            .subscribe(course => this.courseToUpdate = course);

    }

    private _retrieveSecondElementOfList(): void {

        this.courses$
            .switchMap(courses => courses)
            .skip(1)
            .subscribe(course => this.courseToRemove = course);

    }
}

