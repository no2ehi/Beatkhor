import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../../services/main.service';
import { CommonService } from './../../../../services/common.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnChanges {

  @Input() public categories;
  @Input() public loading;
  @Input() public error;
  @Output() private refresh = new EventEmitter();
  @ViewChild('form') addFormViewChild;
  seletedSubCategories = [];
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Disable form if there is an error in getting data
    if (this.addForm && changes.error) {
      if (changes.error.currentValue) {
        this.addForm.disable();
      } else {
        this.addForm.enable();
      }
    }
  }

  /**
   * @description Creates the form to for adding category by formBuilder
   */
  createForm() {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      slug: ['', [Validators.required, Validators.minLength(3)]],
      isParent: [false],
      parentId: ['', this.requiredIfIsParent],
      positionMode: ['after', Validators.required],
      index: ['', Validators.required]
    });
    this.addForm.controls.index.disable();
  }

  /**
   * @description This makes the form input required only if category is parent
   * @param {FormControl} input 
   * @returns null If input is valid
   */
  requiredIfIsParent(input: FormControl) {
    const value = input.value;
    if (!input.root.value.isParent) {
      if (value) {
        return null;
      } else {
        return 'err';
      }
    } else {
      return null;
    }
  }

  /**
   * @description This function sends category data to add to server
   */
  async addCategory() {
    if (this.addForm.valid) {

      try {
        await this.mainService.addCategory(
          this.addForm.value.title,
          this.addForm.value.slug,
          this.addForm.value.isParent,
          this.addForm.value.parentId,
          this.addForm.value.positionMode,
          this.addForm.value.index
        );
        // Reset Form
        this.addFormViewChild.resetForm();

        this.refresh.emit();
      } catch (error) {

        console.log(error);
        if (error.staus == 0) {
          this.commonService.showSnackBar('خطا در اتصال به سرور!', 'فهمیدم');
        } else {

          switch (error.error) {
            case 'ParentNotExists':
              this.commonService.showSnackBar('دسته ی مادر انتخاب شده وجود ندارد!', 'فهمیدم');
              break;
            default:
              this.commonService.showSnackBar('مشکلی در روند افزودن دسته به وجود آمده است.', 'فهمیدم');
              break;
          }

        }
      }

    } else {
      this.addForm.updateValueAndValidity()
    }
  }

  /**
   * @description Fills the seletedSubCategories variable for position selection
   */
  updatePositionSelection() {
    this.addForm.controls.index.reset();
    if (!this.addForm.value.isParent) {
      if (this.addForm.value.parentId) {
        for (const category of this.categories) {
          if (category.id === this.addForm.value.parentId) {
            this.seletedSubCategories = category.categories;
            break;
          }
        }
        this.addForm.controls.index.enable();
      } else {
        this.addForm.controls.index.disable();
      }
    } else {
      this.seletedSubCategories = this.categories;
      this.addForm.controls.index.enable();
    }
  }

  inParentChange() {
    this.addForm.controls.index.reset();
    this.addForm.controls.parentId.reset();
    this.updatePositionSelection();
  }
}
