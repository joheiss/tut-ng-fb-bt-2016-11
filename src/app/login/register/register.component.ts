import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {UserDTO} from "../../shared/model/userDTO";

@Component({
    selector: 'jo-tut-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    private user: UserDTO;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _location: Location,
                private _authService: AuthService) {

        _route.data
            .subscribe(data => this.user = data["user"]);
    }


    ngOnInit(): void {
    }

    onSave(data) {

        const user = data;

        this._authService.signUp(user.email, user.password, user.displayName, user.photoURL)
            .subscribe(
                next => this._router.navigate(["/home"]),
                error => alert(`Registration failed: ${error}`)
            );
    }

    onBack() {
        this._location.back();
    }
}
