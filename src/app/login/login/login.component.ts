import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription, Observable} from "rxjs";
import {Location} from "@angular/common";
import {Message} from "../../shared/model/message";

@Component({
    selector: 'jo-tut-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    private form: FormGroup;
    private message: Message = null;

    private _queryParamsSub: Subscription;
    private _originalUrl: string = null;

    constructor(private _fb: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router,
                private _location: Location,
                private _authService: AuthService) {

        this._initializeForm();
    }

    ngOnInit() {

        this._queryParamsSub = this._route.queryParams
            .map(params => params["originalUrl"])
            .subscribe(param => this._originalUrl = param);
    }


    ngOnDestroy(): void {
        this._queryParamsSub.unsubscribe();
    }

    onLogin() {

        const credentials = this.form.value;
        this._authService.login(credentials.email, credentials.password)
            .subscribe(
                next => {
                    this.message = null;
                    if (!this._originalUrl) {
                        this._router.navigate(["/home"]);
                    } else {
                        this._router.navigate([this._originalUrl]);
                    }
                },
                error => this.message = new Message("E", "User and/or password invalid. Please try again.")
            );
    }

    onBack() {
        this._location.back();
    }

    private _initializeForm(): void {

        this.form = this._fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
            rememberMe: [""]
        });
    }
}
