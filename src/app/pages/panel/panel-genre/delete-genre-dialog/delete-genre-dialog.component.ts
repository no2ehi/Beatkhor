import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MainService } from './../../../../services/main.service';
import { CommonService } from './../../../../services/common.service';

@Component({
  selector: 'app-delete-genre-dialog',
  templateUrl: './delete-genre-dialog.component.html',
  styleUrls: ['./delete-genre-dialog.component.scss']
})
export class DeleteGenreDialogComponent implements OnInit {

  loading = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<DeleteGenreDialogComponent>
  ) { }

  ngOnInit() {
  }

  /**
   * @description Requests to delete category group
   */
  async deleteGenre() {
    let isParent = 0,
      statement = 'ژانر';
    if (this.data.genres) {
      isParent = 1;
      statement = 'گروه ژانر';
    }

    try {
      this.loading = true;
      await this.mainService.deleteGenere(this.data.id, isParent);
      this.loading = false;

      if (isParent) {
        this.commonService.showSnackBar('گروه ژانر و ژانر ها با موفقیت حذف شدند.', 'فهمیدم');
      } else {
        this.commonService.showSnackBar('ژانر با موفقیت حذف شد.', 'فهمیدم');
      }
      this.dialogRef.close(true);
    } catch (error) {
      if (error.status === 0) {
        this.commonService.showSnackBar('خطا در اتصال به سرور!', 'فهمیدم');
      } else {
        switch (error.error) {
          case 'GenereGroupExits':
            this.commonService.showSnackBar(`خطا! ${statement} مورد نظر وجود دارد.`, 'فهمیدم');
            break;
          case 'GenreNotExits':
            this.commonService.showSnackBar(`خطا! ${statement} مورد نظر وجود دارد.`, 'فهمیدم');
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
