import {CourseDTO} from "./courseDTO";

export class Course {

    static fromJsonList(jsonList: any): Course[] {
        return jsonList.map(Course.fromJson);
    }

    static fromJson(json: CourseDTO): Course {
        return new Course(json.$key,
            json.url,
            json.description,
            json.iconUrl,
            json.courseListIcon,
            json.longDescription);

    }

    constructor(public $key: string,
                public url: string,
                public description: string,
                public iconUrl: string,
                public courseListIcon: string,
                public longDescription: string) {
    }
}
