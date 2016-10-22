import {AuthProviders, AuthMethods} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyA6XibJtK8awa65yd8aJfw0XDse_WoZg5E",
    authDomain: "ang-fb2.firebaseapp.com",
    databaseURL: "https://ang-fb2.firebaseio.com",
    storageBucket: "ang-fb2.appspot.com",
    messagingSenderId: "430341459165"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
