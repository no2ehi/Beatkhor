import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.scss']
})
export class DisplayCategoriesComponent implements OnInit {

  @Input() public categories;
  @Input() public loading;
  constructor() { }

  ngOnInit() {
  }

}
