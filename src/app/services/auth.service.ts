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
        roles: ['music_producer']
      },
      'login': {
        token: false,
        menu: false,
        roles: ['music_producer']
      },
      'p': {
        path: 'p',
        token: true,
        userMenu: false,
        roles: ['music_producer']
      }
    };
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.mainService.getRole();
    const routesRoles = this.getRoutesRoles();

    if (route.routeConfig.path === 'login' && !!this.mainService.getToken()) {
      this.router.navigate(['/p']);
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
          console.log('ok');
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
