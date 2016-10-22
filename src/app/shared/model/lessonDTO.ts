export class LessonDTO {

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
}
