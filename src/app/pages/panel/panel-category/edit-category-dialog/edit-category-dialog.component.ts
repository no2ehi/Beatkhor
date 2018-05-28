import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MainService } from './../../../../services/main.service';
import { CommonService } from './../../../../services/common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {

  loading: boolean = false;
  editForm: FormGroup;
  isParent: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mainService: MainService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.categories) {
      this.isParent = true;
    }
    this.createForm();
  }

  createForm() {
    this.editForm = this.fb.group({
      title: [this.data.title, Validators.required],
      slug: [this.data.slug, Validators.required],
      color: [{ value: this.data.uiColor, disabled: !this.isParent }, Validators.required],
      backColor: [{ value: this.data.backUiColor, disabled: !this.isParent }, Validators.required]
    });
  }

  editCategory() { }

}
