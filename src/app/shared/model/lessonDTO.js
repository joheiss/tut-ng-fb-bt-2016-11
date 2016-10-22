"use strict";
var LessonDTO = (function () {
    function LessonDTO($key, description, duration, url, videoUrl, tags, pro, longDescription, courseId) {
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
    return LessonDTO;
}());
exports.LessonDTO = LessonDTO;
