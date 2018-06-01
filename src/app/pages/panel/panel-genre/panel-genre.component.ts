import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-panel-genre',
  templateUrl: './panel-genre.component.html',
  styleUrls: ['./panel-genre.component.scss']
})
export class PanelGenreComponent implements OnInit {

  genres = [];
  loading = true;
  error = false;

  constructor(
    private titleService: Title,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('بیت خور - ژانر ها');
    this.getData();
  }

  /**
    * @description Gets all genres data to display on list
    */
  async getData() {

    try {
      this.loading = true;
      this.genres = await this.mainService.getGenres();
      this.genres = this.mainService.orderGenreData(this.genres);
      this.error = false;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }

  }

}
