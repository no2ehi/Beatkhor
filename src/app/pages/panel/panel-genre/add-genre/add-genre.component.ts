import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../../services/main.service';
import { CommonService } from './../../../../services/common.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit, OnChanges {

  @Input() public genres;
  @Input() public loading;
  @Input() public error;
  @Output() private refresh = new EventEmitter();
  @ViewChild('form') addFormViewChild;
  selectedSubGenres = [];
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
   * @description Creates the form to for adding genre by formBuilder
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
 * @description This makes the form input required only if genre is parent
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
   * @description This function sends genre data to add to server
   */
  async addGenre() {
    if (this.addForm.valid) {

      try {
        await this.mainService.addGenre(
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
        if (error.status === 0) {
          this.commonService.showSnackBar('خطا در اتصال به سرور!', 'فهمیدم');
        } else {

          switch (error.error) {
            case 'ParentNotExits':
              this.commonService.showSnackBar('گروه ژانر انتخاب شده وجود ندارد!', 'فهمیدم');
              break;
            default:
              this.commonService.showSnackBar('مشکلی در روند افزودن ژانر به وجود آمده است.', 'فهمیدم');
              break;
          }
        }
      }
    } else {
      this.addForm.updateValueAndValidity()
    }
  }

  /**
   * @description Fills the seletedSubGenres variable for position selection
   */
  updatePositionSelection() {
    this.addForm.controls.index.reset();
    if (!this.addForm.value.isParent) {
      if (this.addForm.value.parentId) {
        for (const genre of this.genres) {
          if (genre.id === this.addForm.value.parentId) {
            this.selectedSubGenres = genre.genres;
            break;
          }
        }
        this.addForm.controls.index.enable();
      } else {
        this.addForm.controls.index.disable();
      }
    } else {
      this.selectedSubGenres = this.genres;
      this.addForm.controls.index.enable();
    }
  }

  isParentChange() {
    this.addForm.controls.index.reset();
    this.addForm.controls.parentId.reset();
    this.updatePositionSelection();
  }

} 
