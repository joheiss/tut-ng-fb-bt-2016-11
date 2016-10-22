import {Injectable} from '@angular/core';
import {FirebaseAuth, FirebaseAuthState} from "angularfire2";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthInfo} from "../model/authInfo";

@Injectable()
export class AuthService {

    static readonly UNKNOWN_USER = new AuthInfo(null, null);

    public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

    constructor(private _auth: FirebaseAuth) {
    }

    login(email: string, password: string): Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this._auth.login({email: email, password: password}));
    }

    signUp(email: string, password: string, displayName: string, photoURL: string): Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this._auth.createUser({email: email, password: password})
            .then(authState => authState.auth.updateProfile({displayName, photoURL}))
        );
    }

    updateProfile(displayName: string, photoURL: string): Observable<FirebaseAuthState> {

        return this._auth
            .filter(authState => !!authState)
            .switchMap(authState => this.fromFirebaseAuthPromise(authState.auth.updateProfile({displayName, photoURL})));
    }

    logout() {
        this._auth.logout();
        this.authInfo$.next(AuthService.UNKNOWN_USER);
    }

    fromFirebaseAuthPromise(promise): Observable<any> {

        const subject = new Subject<any>();

        promise.then(
            resolve => {
                console.log("in resolve");
                this._auth
                    .filter(auth => !!auth)
                    .subscribe(auth => {
                        const authInfo = new AuthInfo(auth.uid, auth.auth);
                        this.authInfo$.next(authInfo);
                        subject.next(resolve);
                        subject.complete();
                    });
            })
            .catch(
                reject => {
                    this.authInfo$.next(AuthService.UNKNOWN_USER);
                    subject.error(reject);
                    subject.complete();
                });

        return subject.asObservable();
    }
}
