import { Component, OnInit } from '@angular/core';
import { MainService } from "./../../../services/main.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-panel-posts',
  templateUrl: './panel-posts.component.html',
  styleUrls: ['./panel-posts.component.scss']
})
export class PanelPostsComponent implements OnInit {

  role = '';
  constructor(
    private mainService: MainService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('بیت‌خور - مدیریت پست‌ها');
    this.role = this.mainService.getRole();
  }

}
