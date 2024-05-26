import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    if (inject(AuthService).getToken()) {
        return true
    } else {
        inject(Router).navigateByUrl('auth/login')
        return false
    }
}