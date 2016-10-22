import {database, auth, initializeApp} from "firebase";
import {firebaseConfig} from "../environments/firebase.config";
import {dbData} from "../../data/db-data";
import {Observable} from "rxjs";


console.log('Initializing Firebase database ... ');

initializeApp(firebaseConfig);

const coursesRef = database().ref('courses');
const lessonsRef = database().ref('lessons');
const association = database().ref('lessonsPerCourse');

let courseRef: any;

auth()
    .signInWithEmailAndPassword("test@jovisco.test.de", "test1234")
    .then(runLoader)
    .catch(onError);

function onError(error) {
    console.error("Could not login: ", error);
    process.exit();
}

function runLoader() {

    Observable.from(dbData.courses)
        .do(() => console.log("Adding course..."))
        .do((course: any) => courseRef = addCourse(course))
        .mergeMap((course: any) => Observable.from(course.lessons))
        .do(() => console.log("... adding lessons and assigning them to the course"))
        .do((lesson: any) => addLessonAndLinkToCourse(lesson, courseRef))
        .subscribe();

    console.log("Initialization finished");
}

function addCourse(course: any): any {

    return coursesRef.push({
        url: course.url,
        description: course.description,
        iconUrl: course.iconUrl,
        courseListIcon: course.courseListIcon,
        longDescription: course.longDescription
    });
}

function addLessonAndLinkToCourse(lesson, courseRef): void {

    const lessonRef = addLesson(lesson, courseRef);
    assignLessonToCourse(lessonRef, courseRef);
}

function addLesson(lesson: any, courseRef: any): any {

    return lessonsRef.push({
        description: lesson.description,
        duration: lesson.duration,
        url: lesson.url,
        tags: lesson.tags,
        videoUrl: lesson.videoUrl || null,
        longDescription: lesson.longDescription,
        courseId: courseRef.key
    }).key;
}

function assignLessonToCourse(lessonRef: any, courseRef: any): void {

    const lessonsPerCourse = association.child(courseRef.key);
    const lessonCourseAssociation = lessonsPerCourse.child(lessonRef);
    lessonCourseAssociation.set(true);
}

