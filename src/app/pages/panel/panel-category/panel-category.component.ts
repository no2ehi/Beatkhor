import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from './../../../services/main.service';

@Component({
  selector: 'app-panel-category',
  templateUrl: './panel-category.component.html',
  styleUrls: ['./panel-category.component.scss']
})
export class PanelCategoryComponent implements OnInit {

  categories = [];
  loading = true;
  error = false;

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

    try {
      this.loading = true;
      this.categories = await this.mainService.getCategories();
      this.categories = this.mainService.orderCategoryData(this.categories);
      this.error = false;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }

  }

}
