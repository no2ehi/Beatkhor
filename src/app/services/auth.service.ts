import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from './main.service';
import { CommonService } from './common.service';

@Injectable()
export class AuthService {

  constructor(
    public router: Router,
    private mainService: MainService,
    private commonService: CommonService
  ) { }

  getRoutesRoles(): object {
    return {
      '': {
        path: '',
        token: 'optional',
        menu: false,
        roles: ['music_producer']
      },
      'login': {
        token: false,
        roles: ['music_producer']
      },
      'p': {
        path: 'p',
        token: true,
        userMenu: false,
        roles: ['music_producer', 'administrator']
      },
      'dashboard': {
        path: 'dashboard',
        routerLink: '/p/dashboard',
        token: true,
        userMenu: true,
        adminMenu: true,
        userTitle: 'میز کار من',
        adminTitle: 'میز کار من',
        icon: 'assessment',
        roles: ['music_producer', 'administrator']
      },
      'posts': {
        path: 'posts',
        routerLink: '/p/posts',
        token: true,
        userMenu: true,
        adminMenu: true,
        userTitle: 'آثار من',
        adminTitle: 'مدیریت پست‌ها',
        icon: 'audiotrack',
        roles: ['music_producer', 'administrator']
      },
      'manage_categories': {
        path: 'manage_categories',
        routerLink: '/p/manage_categories',
        token: true,
        userMenu: false,
        adminMenu: true,
        adminTitle: 'دسته بندی‌‌ها',
        icon: 'category',
        roles: ['administrator']
      },
      'manage_genres': {
        path: 'manage_genres',
        routerLink: '/p/manage_genres',
        token: true,
        userMenu: false,
        adminMenu: true,
        adminTitle: 'ژانر ها',
        icon: 'dashboard',
        roles: ['administrator']
      }
    };
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.mainService.getRole();
    const routesRoles = this.getRoutesRoles();
    console.log(route.routeConfig.path);

    if (route.routeConfig.path === 'login' && !!this.mainService.getToken()) {
      this.router.navigate(['/p']);
      return false;
    }

    if (routesRoles[route.routeConfig.path].token === 'optional') {
      return true;
    }

    if (routesRoles[route.routeConfig.path].token && !this.mainService.getToken()) {
      this.router.navigate(['/login']);
      this.commonService.showSnackBar('برای دسترسی به صفحه مورد نظر ابتدا وارد شوید.', 'فهمیدم');
      return false;
    }

    if (routesRoles[route.routeConfig.path].token && !!this.mainService.getToken()) {
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
    }

    if (!routesRoles[route.routeConfig.path].token && !!this.mainService.getToken()) {
      return false;
    }

    if (!routesRoles[route.routeConfig.path].token && !this.mainService.getToken()) {
      return true;
    }

  }
}
