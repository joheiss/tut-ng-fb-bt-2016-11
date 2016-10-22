import {LessonDTO} from "./lessonDTO";

export class Lesson {

    static fromJsonList(jsonList: any): Lesson[] {
        return jsonList.map(Lesson.fromJson);
    }

    static fromJson(json: LessonDTO): Lesson {
        return new Lesson(json.$key,
            json.description,
            json.duration,
            json.url,
            json.videoUrl,
            json.tags,
            json.pro,
            json.longDescription,
            json.courseId);
    }

    constructor(public $key: string,
                public description: string,
                public duration: string,
                public url: string,
                public videoUrl: string,
                public tags: string,
                public pro: boolean,
                public longDescription: string,
                public courseId: string) {
    }

    get isBeginner() {
        return this.tags && this.tags.includes("BEGINNER");
    }

}
