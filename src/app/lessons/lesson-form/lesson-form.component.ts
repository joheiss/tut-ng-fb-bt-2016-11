import {Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateUrl} from "../../shared/validators/validateUrl";
import {ValidationUtility} from "../../shared/validators/validation-utility";

@Component({
    selector: 'jo-tut-lesson-form',
    templateUrl: './lesson-form.component.html',
    styleUrls: ['./lesson-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LessonFormComponent implements OnInit, OnChanges {

    private form: FormGroup;

    @Input() private initialState: any;

    constructor(private _fb: FormBuilder) {
        this._initializeForm();
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (this.form && changes["initialState"]) {
            this.form.patchValue(changes["initialState"].currentValue);
        }
    }

    ngOnInit() {
    }

    hasError(field: string, error: string): boolean {

        return this.form.controls[field].touched
            && this.form.controls[field].dirty
            && this.form.controls[field].errors
            && this.form.controls[field].errors[error];
    }

    reset() {
        this.form.reset();
    }

    get valid(): boolean {
        return this.form.valid;
    }

    get value(): any {
        return this.form.value;
    }

    private _initializeForm(): void {

        this.form = this._fb.group({
            description: ["", [Validators.required, Validators.minLength(10)]],
            url: ["", Validators.required],
            videoUrl: ["", [Validators.required, ValidationUtility.validateUrl]],
            tags: ["", Validators.required],
            longDescription: [""]
        });
    }
}
