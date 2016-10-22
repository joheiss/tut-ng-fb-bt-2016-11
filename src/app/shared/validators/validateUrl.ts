import {FormControl} from "@angular/forms";

export function validateUrl(control: FormControl) {

  const url:any = control.value;

  const VALID_URL = /^(ftp|http|https):\/\/[^ "]+$/.test(url);

  return VALID_URL ? null : {
    validUrl: {
      valid: false
    }
  };
}
