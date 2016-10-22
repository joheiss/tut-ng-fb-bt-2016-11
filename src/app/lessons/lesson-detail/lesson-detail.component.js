"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LessonDetailComponent = (function () {
    function LessonDetailComponent(_router, _route, _lessonsService) {
        this._router = _router;
        this._route = _route;
        this._lessonsService = _lessonsService;
    }
    LessonDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params
            .switchMap(function (params) { return _this._lessonsService.findLessonByUrl(params["id"]); })
            .subscribe(function (lesson) { return _this.lesson = lesson; });
    };
    LessonDetailComponent.prototype.onNext = function (lesson) {
        this._lessonsService.loadNextLesson(lesson.courseId, lesson.$key)
            .subscribe(this.navigateToLesson.bind(this));
    };
    LessonDetailComponent.prototype.onPrevious = function (lesson) {
        this._lessonsService.loadPreviousLesson(lesson.courseId, lesson.$key)
            .subscribe(this.navigateToLesson.bind(this));
    };
    LessonDetailComponent.prototype.navigateToLesson = function (lesson) {
        this._router.navigate(["lessons", lesson.url]);
    };
    LessonDetailComponent = __decorate([
        core_1.Component({
            selector: 'jo-tut-lesson-detail',
            templateUrl: './lesson-detail.component.html',
            styleUrls: ['./lesson-detail.component.css']
        })
    ], LessonDetailComponent);
    return LessonDetailComponent;
}());
exports.LessonDetailComponent = LessonDetailComponent;
