import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Location} from "@angular/common";
import {UserDTO} from "../../shared/model/userDTO";

@Component({
    selector: 'jo-tut-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    private user: UserDTO;

    constructor(private _route: ActivatedRoute,
                private _location: Location,
                private _authService: AuthService) {

        _route.data
            .subscribe(data => {
                this.user = data["user"];
                console.log("Profile Component - User: ", this.user);
            });
    }

    ngOnInit() {
    }

    onSave(data) {

        const user = data;

        this._authService.updateProfile(user.displayName, user.photoUrl)
            .subscribe(
                next => console.log,
                error => alert(`Profile update failed: ${error}`)
            );
    }

    onBack() {
        this._location.back();
    }
}
