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

  ngOnInit() { }

  /**
   * @description Requests to delete category group
   */
  async deleteCategory() {
    let isParent = false,
      statement = 'دسته‌ی';
    if (this.data.categories) {
      isParent = true;
      statement = 'سردسته‌ی';
    }

    try {
      this.loading = true;
      await this.mainService.deleteCategory(this.data.id, isParent);
      this.loading = false;

      if (isParent) {
        this.commonService.showSnackBar('سر دسته و زیر مجموعه‌ها با موفقیت حذف شدند.', 'فهمیدم');
      } else {
        this.commonService.showSnackBar('دسته با موفقیت حذف شد.', 'فهمیدم');
      }
      this.dialogRef.close(true);
    } catch (error) {
      if (error.status == 0) {
        this.commonService.showSnackBar('خطا در اتصال به سرور!', 'فهمیدم');
      } else {
        switch (error.error) {
          case 'CategoryGroupNotExists':
            this.commonService.showSnackBar(`خطا! ${statement} مورد نظر وجود ندارد.`, 'فهمیدم');
            break;
          case 'CategoryNotExists':
            this.commonService.showSnackBar(`خطا! ${statement} مورد نظر وجود ندارد.`, 'فهمیدم');
            break;
          default:
            this.commonService.showSnackBar(`خطا! مشکلی در حذف ${statement} به وجود آمده است.`, 'فهمیدم');
            console.log(error);
        }
      }
      this.loading = false;
      this.dialogRef.close(false);
    }
  }

}
