import { Component, OnInit } from '@angular/core';
import { MainService } from "./../../../services/main.service";

@Component({
  selector: 'app-panel-posts',
  templateUrl: './panel-posts.component.html',
  styleUrls: ['./panel-posts.component.scss']
})
export class PanelPostsComponent implements OnInit {

  role = '';
  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.role = this.mainService.getRole();
  }

}
