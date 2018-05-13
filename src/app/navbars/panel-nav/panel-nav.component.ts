import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { MainService } from './../../services/main.service';
@Component({
  selector: 'app-panel-nav',
  templateUrl: './panel-nav.component.html',
  styleUrls: ['./panel-nav.component.scss']
})
export class PanelNavComponent implements OnInit {

  list: object = {};
  orderedList: any[] = [];
  role = '';
  constructor(
    private authService: AuthService,
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.list = this.authService.getRoutesRoles();
    this.role = this.mainService.getRole();
    this.order();
  }

  order() {
    for (const key in this.list) {

      if (!this.list[key].adminMenu && !this.list[key].userMenu) {
        continue;
      }

      if (this.role === 'administrator' || this.role === 'admin') {

        if (!this.list[key].adminMenu) {
          continue;
        }
        this.orderedList.push({
          content: this.list[key].adminTitle,
          icon: this.list[key].icon,
          routerLink: this.list[key].routerLink
        });
      } else {

        if (!this.list[key].userMenu) {
          continue;
        }
        this.orderedList.push({
          content: this.list[key].userTitle,
          icon: this.list[key].icon,
          routerLink: this.list[key].routerLink
        });
      }
    }
    console.log(this.orderedList);
  }

  logout() {
    this.mainService.removeLoginData();
    this.router.navigate(['/']);
  }

}
