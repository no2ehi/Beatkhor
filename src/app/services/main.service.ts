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

  registerUser(nickName: string, email: string, password: string): Promise<object> {
    return this.http.post<any>(environment.API_URL + '/app/user/register', {}).toPromise();;
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
}
