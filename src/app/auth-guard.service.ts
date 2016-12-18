import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import { AuthService } from './login/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!state.url.startsWith('/#access_token') && !state.url.startsWith('/login') && !this.authService.authenticated()) {
            this.router.navigate(['/login']);
            console.debug("vai para login");
            return false;
        }

        return true;
    }
    canActivatee(): boolean {
        console.log('AuthGuard#canActivate called');
        return this.authService.authenticated();
    }
}
