///<reference path="../../node_modules/typescript/lib/lib.es6.d.ts"/>

import {initializeApp, auth, database} from "firebase";
import {firebaseConfig} from "../environments/firebase.config";

const Queue = require("firebase-queue");

console.log("Running batch server ...");

initializeApp(firebaseConfig);

auth()
    .signInWithEmailAndPassword("test@jovisco.test.de", "test1234")
    .then(runConsumer)
    .catch(onError);

function onError(error) {
    console.error("Could not login: ", error);
    process.exit();
}

function runConsumer() {

    const lessonRef = database().ref("lessons");
    const lessonsPerCourseRef = database().ref("lessonsPerCourse");

    const queueRef = database().ref("queue");
    const queue = new Queue(queueRef, function(data, progress, resolve, reject) {

        console.log("... received deletion request: ", data);

        const promiseDeleteLesson = lessonRef.child(data.lessonKey).remove();
        const promiseDeleteLessonsPerCourse = lessonsPerCourseRef.child(`${data.courseKey}/${data.lessonKey}`).remove();

        Promise.all([promiseDeleteLesson, promiseDeleteLessonsPerCourse])
            .then(
                () => {
                    console.log("Lesson deleted");
                    resolve();
                })
            .catch(
                error => {
                    console.log("Error during lesson deletion: ", error);
                    reject();
                });
    });
}

