import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {UserDTO} from "../model/userDTO";

@Injectable()
export class UserResolver implements Resolve<firebase.User> {

    constructor(private _authService: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDTO> {

        return this._authService.authInfo$
            .filter(authInfo => !!authInfo)
            .first()
            .map(authInfo => authInfo.user);
    }
}
