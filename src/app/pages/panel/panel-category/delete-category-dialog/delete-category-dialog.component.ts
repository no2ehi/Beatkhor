import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MainService } from './../../../../services/main.service';
import { CommonService } from './../../../../services/common.service';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss']
})
export class DeleteCategoryDialogComponent implements OnInit {

  loading = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  /**
   * @description Requests to delete category group
   */
  deleteCategory() {
    let isParent = false;
    if (this.data.categories) {
      isParent = true;
    }
    console.log(isParent, this.data.id);
  }

}
