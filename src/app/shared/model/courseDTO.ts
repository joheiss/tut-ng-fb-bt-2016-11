export class CourseDTO {

    constructor(public $key: string,
                public url: string,
                public description: string,
                public iconUrl: string,
                public courseListIcon: string,
                public longDescription: string) {
    }
}
