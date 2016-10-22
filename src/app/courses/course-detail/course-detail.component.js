"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var CourseDetailComponent = (function () {
    function CourseDetailComponent(_router, _route, _coursesService) {
        this._router = _router;
        this._route = _route;
        this._coursesService = _coursesService;
        this.readonly = PAGESIZE;
        this.number = 5;
    }
    CourseDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageNo = 1;
        this.courseUrl = this._route.snapshot.params["id"];
        this._coursesService.findCourseByUrl(this.courseUrl)
            .subscribe(function (course) { return _this.course = course; });
        this._coursesService.loadFirstLessonsPage(this.courseUrl, 5)
            .subscribe(function (lessons) { return _this.lessons = lessons; });
    };
    CourseDetailComponent.prototype.onNextPage = function () {
        var _this = this;
        this.pageNo++;
        this._coursesService.loadNextLessonsPage(this.courseUrl, this.lessons[this.lessons.length - 1].$key, this.PAGESIZE)
            .subscribe(function (lessons) { return _this.lessons = lessons; });
    };
    CourseDetailComponent.prototype.onPreviousPage = function () {
        var _this = this;
        this.pageNo--;
        this._coursesService.loadPreviousLessonsPage(this.courseUrl, this.lessons[0].$key, this.PAGESIZE)
            .subscribe(function (lessons) { return _this.lessons = lessons; });
    };
    CourseDetailComponent.prototype.navigateToLesson = function (lesson) {
        this._router.navigate(['lessons', lesson.url]);
    };
    CourseDetailComponent = __decorate([
        core_1.Component({
            selector: 'jo-tut-course-detail',
            templateUrl: './course-detail.component.html',
            styleUrls: ['./course-detail.component.css']
        })
    ], CourseDetailComponent);
    return CourseDetailComponent;
}());
exports.CourseDetailComponent = CourseDetailComponent;
