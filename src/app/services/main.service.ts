import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  setLoginData(loginData: object) {
    for (const key in loginData) {
      if (loginData.hasOwnProperty(key)) {
        localStorage.setItem(key, loginData[key]);
      }
    }
  }

  removeLoginData() {
    localStorage.clear();
  }

  getRole(): string {
    return localStorage.getItem('role');
  }
  getName(): string {
    return localStorage.getItem('name');
  }
  getUsername(): string {
    return localStorage.getItem('userName');
  }
  getUserRoleId(): string {
    return localStorage.getItem('userRoleId');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }

  getRoutesRoles(): object {
    return {
      '': {
        path: '',
        token: false,
        menu: false,
        roles: ['مدیر', 'مدیر ارشد', 'آهنگساز', 'خواننده', 'طراح']
      },
      'default': {
        token: false,
        menu: false,
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
    const role = this.getRole();
    const routesRoles = this.getRoutesRoles();

    if (routesRoles[route.routeConfig.path].token === !!this.getToken()) {
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
      return false;
    }
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.API_URL + '/app/user/login', { USER_NAME: username, PASSWORD: password });
  }
}
