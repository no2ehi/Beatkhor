import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from './../services/main.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [MainService]
})
export class IndexComponent implements OnInit {

  private role = '';

  constructor(
    public router: Router,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.role = this.mainService.getRole();
    this.navigateToDefaultRoute();
  }

  navigateToDefaultRoute() {
    // if (this.role === null && this.router.url === '/') {
    //   this.router.navigate(['/default']);
    // }
  }

}
