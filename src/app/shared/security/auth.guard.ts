import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService,
                private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {

        return this._authService.authInfo$
            .filter(authInfo => !!authInfo)
            .map(authInfo => authInfo.isLoggedIn())
            .first()
            .do(allowed => {
                if (!allowed) {
                    this._router.navigate(["/login"], { queryParams: { originalUrl: state.url }});
                }
            });
    }
}
