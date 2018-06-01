import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MainService } from './../../../../services/main.service';
import { CommonService } from './../../../../services/common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-edit-genre-dialog',
  templateUrl: './edit-genre-dialog.component.html',
  styleUrls: ['./edit-genre-dialog.component.scss']
})
export class EditGenreDialogComponent implements OnInit {

  loading: boolean = false;
  editForm: FormGroup;
  isParent: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mainService: MainService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<EditGenreDialogComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.genres) {
      this.isParent = true;
    }
    this.creatForm();
  }

  creatForm() {
    this.editForm = this.fb.group({
      title: [this.data.title, Validators.required],
      slug: [this.data.slug, Validators.required],
      color: [{ value: this.data.uiColor, disabled: !this.isParent }, Validators.required],
      backColor: [{ value: this.data.backColor, disabled: !this.isParent }, Validators.required]
    });
  }

  async editGenre() {

    try {
      this.loading = true;
      await this.mainService.editGenre(
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
      if (error.status === 0) {
        this.commonService.showSnackBar('خطا در اتصال به سرور!', 'فهمیدم');
      } else {
        switch (error.error) {
          case 'Unauthorized':
            this.commonService.showSnackBar('شما وارد نشده اید ابتدا وارد شوید.', 'فهمیدم');
            break;
          case 'GenreGroupNotExits':
            this.commonService.showSnackBar('گروه ژانر موردنظر وجود ندارد!', 'فهمیدم');
            break;
          case 'GenreGroupNotExits':
            this.commonService.showSnackBar('ژانر موردنظر وجود ندارد!', 'فهمیدم');
            break;
          default:
            this.commonService.showSnackBar('مشکلی در روند ویرایش به وجود آمده است!', 'فهمیدم');
        }
      }
    }
  }


}
