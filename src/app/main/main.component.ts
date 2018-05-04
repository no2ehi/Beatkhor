import { Component, OnInit } from '@angular/core';
import { MainService } from './../services/main.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MainService]
})
export class MainComponent implements OnInit {

  userRole = '';

  constructor(
    private mainService: MainService,
    public router: Router
  ) { }

  ngOnInit() {
    // this.userRole = this.mainService.getRole();
    console.log(this.router.url);
    console.log(this.isLoginUrl());
  }

  /**
   * @description To know if the user is going to login page
   * @returns {boolean}
   */
  isLoginUrl(): boolean {
    if (this.router.url === '/login') {
      return true;
    } else {
      return false;
    }
  }

}
