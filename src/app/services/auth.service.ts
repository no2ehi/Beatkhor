import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from './main.service';

@Injectable()
export class AuthService {

  constructor(
    public router: Router,
    private mainService: MainService
  ) { }

  getRoutesRoles(): object {
    return {
      '': {
        path: '',
        token: false,
        menu: false,
        all: true,
        roles: ['مدیر', 'مدیر ارشد', 'آهنگساز', 'خواننده', 'طراح']
      },
      'login': {
        token: false,
        menu: false,
        roles: ['مدیر', 'مدیر ارشد', 'آهنگساز', 'خواننده', 'طراح']
      }
    };
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.mainService.getRole();
    const routesRoles = this.getRoutesRoles();

    if (route.routeConfig.path === 'login' && !!this.mainService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }

    if (routesRoles[route.routeConfig.path].all) {
      return true;
    }


    if (routesRoles[route.routeConfig.path].token === !!this.mainService.getToken()) {
      if (role) {
        if (routesRoles[route.routeConfig.path].roles.indexOf(role) > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      console.log('Token:', routesRoles[route.routeConfig.path].token);
      console.log('getToken:', this.mainService.getToken());
      return false;
    }
  }
}
