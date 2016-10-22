"use strict";
var Lesson = (function () {
    function Lesson($key, description, duration, url, videoUrl, tags, pro, longDescription, courseId) {
        this.$key = $key;
        this.description = description;
        this.duration = duration;
        this.url = url;
        this.videoUrl = videoUrl;
        this.tags = tags;
        this.pro = pro;
        this.longDescription = longDescription;
        this.courseId = courseId;
    }
    Lesson.fromJsonList = function (jsonList) {
        return jsonList.map(Lesson.fromJson);
    };
    Lesson.fromJson = function (json) {
        return new Lesson(json.$key, json.description, json.duration, json.url, json.videoUrl, json.tags, json.pro, json.longDescription, json.courseId);
    };
    Object.defineProperty(Lesson.prototype, "isBeginner", {
        get: function () {
            return this.tags && this.tags.includes("BEGINNER");
        },
        enumerable: true,
        configurable: true
    });
    return Lesson;
}());
exports.Lesson = Lesson;
