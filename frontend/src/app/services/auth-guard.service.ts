import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_HOME_URL, LOGIN_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');
    const isRootPath = state.url === '/' || state.url === '';

    if (isRootPath) {
      return authToken ? this.router.parseUrl(APP_HOME_URL) : true;
    }

    if (authToken) {
      return true;
    } else {
      return this.router.parseUrl(LOGIN_URL);
    }
  }
}
