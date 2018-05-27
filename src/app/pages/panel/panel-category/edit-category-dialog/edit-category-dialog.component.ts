import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MainService } from './../../../../services/main.service';
import { CommonService } from './../../../../services/common.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {

  loading = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>
  ) { }

  ngOnInit() {
  }

  editCategory() { }

}
