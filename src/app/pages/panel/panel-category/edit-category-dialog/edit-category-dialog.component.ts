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

  async editCategory() {

    try {
      this.loading = true;
      await this.mainService.editCategory(
        this.isParent,
        this.data.id,
        this.editForm.value.title,
        this.editForm.value.slug,
        this.editForm.value.color,
        this.editForm.value.backColor
      );
      this.loading = false;
      this.dialogRef.close(true);
      this.commonService.showSnackBar('تغییرات با موفقیت اعمال شد.', 'فهمیدم');
    } catch (error) {
      this.loading = false;
      if (error.status === 0) {
        this.commonService.showSnackBar('خطا در اتصال به سرور!', 'فهمیدم');
      } else {
        switch (error.error) {
          case 'Unauthorized':
            this.commonService.showSnackBar('شما وارد نشده‌اید ابتدا وارد شوید.', 'فهمیدم');
            break;
          case 'CategoryGroupNotExists':
            this.commonService.showSnackBar('سر دسته‌ی مورد نظر وجود ندارد!', 'فهمیدم');
            break;
          case 'CategoryNotExists':
            this.commonService.showSnackBar('دسته‌ی مورد نظر وجود ندارد!', 'فهمیدم');
            break;
          default:
            this.commonService.showSnackBar('مشکلی در روند ویرایش به وجود آمده است!', 'فهمیدم');
        }
      }

    }
  }

}
