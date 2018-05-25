import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.scss']
})
export class DisplayCategoriesComponent implements OnInit {

  @Input() public categories;
  @Input() public loading;
  @Output() public refresh = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  refreshData() {
    this.refresh.emit();
  }

}
