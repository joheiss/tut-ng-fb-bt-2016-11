import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Pipe({
    name: 'secureUrl'
})
export class SecureUrlPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {
    }

    transform(url): SafeResourceUrl {
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}
