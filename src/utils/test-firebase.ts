import {database, initializeApp} from "firebase";
import {firebaseConfig} from "../environments/firebase.config";

// -- initialize firebase

initializeApp(firebaseConfig);

// test firebase
const root = database().ref();
root.on('value', function (snap) {
    console.log(snap.val());
});
