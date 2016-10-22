import {FormGroup, FormControl} from "@angular/forms";

export class ValidationUtility {

    public static validateEmail(control:FormControl):{[s:string]:boolean} {

        const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (!control.value.match(EMAIL_REGEX)) {
            return {invalidMail: true};
        }
    }

    public static validateUrl(control: FormControl):{[s:string]:boolean} {

        const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

        const url: any = control.value;

        return URL_REGEX.test(url) ? null : {invalidUrl: true};
    }

    public static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {

        return (group: FormGroup) => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return confirmPassword.setErrors({ mismatchedPasswords: true });
            } else {
                return confirmPassword.setErrors(confirmPassword.validator(confirmPassword));
            }
        }
    }
}
