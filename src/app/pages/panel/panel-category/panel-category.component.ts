import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from './../../../services/main.service';

@Component({
  selector: 'app-panel-category',
  templateUrl: './panel-category.component.html',
  styleUrls: ['./panel-category.component.scss']
})
export class PanelCategoryComponent implements OnInit {

  categories: object[] = [];

  constructor(
    private titleService: Title,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('بیت‌خور - دسته بندی‌ها');
    this.getData();
  }

  /**
   * @description Gets all categories data to display on list
   */
  async getData() {
    this.categories = await this.mainService.getCategories();
    this.categories = this.mainService.orderCategoryData(this.categories);
    console.log(this.categories);
  }

}
