import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from './../../../../services/main.service';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.scss']
})
export class DisplayCategoriesComponent implements OnInit {

  @Input() public categories;
  @Input() public loading;
  @Input() public error;
  @Output() public refresh = new EventEmitter();

  constructor(
    private mainService: MainService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  /**
   * @description emits an event to refresh category data
   */
  refreshData() {
    this.refresh.emit();
  }

  /**
   * @description Changes the hover state of the category to show the menu
   * @param {object} value 
   */
  toggleHover(value) {
    value.hover = !value.hover;
  }

  /**
   * @description Opens confirmation dialog to delete selected category/caregoryGroup
   * @param {object} category 
   */
  deleteCategory(category) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      width: '360px',
      data: category
    });
  }

}
