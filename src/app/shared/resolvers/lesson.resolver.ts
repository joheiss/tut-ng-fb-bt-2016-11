import {Lesson} from "../model/lesson";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LessonsService} from "../services/lessons.service";

@Injectable()
export class LessonResolver implements Resolve<Lesson> {

    constructor(private _lessonsService: LessonsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson> {

        return this._lessonsService
            .findLessonByUrl(route.params["id"])
            .first();
    }
}
