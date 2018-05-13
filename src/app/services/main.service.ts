import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  /**
   * @description set authorization for user's local storage
   * @param loginData 
   */
  setauthorization(data: object) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        localStorage.setItem(key, data[key]);
      }
    }
  }

  registerUser(nickName: string, email: string, password: string, role: string): Promise<object> {
    const data = { nickName, email, password, role };
    return this.http.post<object>(environment.API_URL + '/app/user/register', data).toPromise();
  }

  loginUser(email: string, password: string): Promise<object> {
    const data = { email, password };
    return this.http.post<object>(environment.API_URL + '/app/user/login', data).toPromise();
  }

  removeLoginData() {
    localStorage.clear();
  }

  getRole(): string {
    return localStorage.getItem('userRole');
  }
  getNickName(): string {
    return localStorage.getItem('nickName');
  }
  getEmail(): string {
    return localStorage.getItem('email');
  }
  getUserRoleId(): string {
    return localStorage.getItem('userRoleId');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
}
