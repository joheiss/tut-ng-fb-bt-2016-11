import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {AuthInfo} from "../shared/model/authInfo";

@Component({
    selector: 'jo-tut-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

    private authInfo: AuthInfo;

    constructor(private _authService: AuthService) {
    }

    ngOnInit() {
        this._authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
    }

    onLogout() {
        this._authService.logout();
    }
}
