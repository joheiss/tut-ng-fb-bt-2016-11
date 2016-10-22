import {UserDTO} from "./userDTO";

export class AuthInfo {

    user: UserDTO;

    constructor(public $uid: string,
                auth: firebase.User) {

        this.user = <UserDTO>{};

        if (auth) {
            this.user.email = auth.email;
            this.user.displayName = auth.displayName;
            this.user.photoURL = auth.photoURL;
            this.user.uid = auth.uid;
        }
    }

    isLoggedIn() {
        return !!this.$uid;
    }
}
