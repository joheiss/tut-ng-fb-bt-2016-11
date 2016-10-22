import {Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy} from "@angular/core";
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Input} from "@angular/core/src/metadata/directives";
import {ValidationUtility} from "../../shared/validators/validation-utility";
import {UserDTO} from "../../shared/model/userDTO";

@Component({
    selector: 'jo-tut-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements OnInit, OnChanges {

    @Input() private mode: string;
    @Input() private user: UserDTO;

    private form: FormGroup;

    constructor(private _fb: FormBuilder) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (!this.form) {
            this._initializeForm();
        }

        if (this.form && changes["user"]) {
            this.form.patchValue(changes["user"].currentValue);
        }
    }

    hasError(field: string, error: string): boolean {

        return this.form.controls[field].touched
            && this.form.controls[field].dirty
            && this.form.controls[field].errors
            && this.form.controls[field].errors[error];
    }

    get valid(): boolean {
        return this.form.valid;
    }

    get value(): any {
        return this.form.value;
    }

    private _initializeForm(): void {

        if (this.mode === "register") {
            this.form = this._fb.group({
                    email: ["", [Validators.required, ValidationUtility.validateEmail]],
                    password: ["", [Validators.required, Validators.minLength(7)]],
                    confirm: ["", Validators.required],
                    displayName: ["", Validators.required],
                    photoURL: [""]
                },
                {
                    validator: ValidationUtility.matchingPasswords('password', 'confirm')
                });
        } else {
            this.form = this._fb.group({
                email: new FormControl({value: "", disabled: true}),
                password: new FormControl({value: "", disabled: true}),
                confirm: new FormControl({value: "", disabled: true}),
                displayName: ["", Validators.required],
                photoURL: [""]
            });
        }
    }
}
