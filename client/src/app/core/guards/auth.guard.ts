import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { isAuth, isAdmin, onFailureRedirectUrl } = route.data;

    if ((isAdmin && this.userService.isAdmin) // is admin
      || isAuth == this.userService.isAuth) { // is user / guest
      return true;
    }

    let redirectUrl = onFailureRedirectUrl;

    if (isAuth && route.url.length > 0) {
      redirectUrl += `?redirect=${route.url.join('/')}`;
    }

    return this.router.parseUrl(redirectUrl);
  }
}
