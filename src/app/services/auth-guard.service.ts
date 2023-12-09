import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router, private authService: AuthService ) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean|UrlTree {

    if (!this.authService.isUserLoggedIn()) {
      // alert('You are not allowed to view this page. You are redirected to login Page');

      this.router.navigate(["login"], {queryParams: {retUrl: route.url}});
      return false;

      // const urlTree = this.router.createUrlTree(['login']);
      // return urlTree;
    }

    return true;
  }

}
