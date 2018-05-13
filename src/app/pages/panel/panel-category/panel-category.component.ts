import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-panel-category',
  templateUrl: './panel-category.component.html',
  styleUrls: ['./panel-category.component.scss']
})
export class PanelCategoryComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('بیت‌خور - دسته بندی‌ها');
  }

}
