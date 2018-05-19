import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../../services/main.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Input() public categories;
  @Input() public loading;
  seletedSubCategories = [];
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.createForm();
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
   * @param input 
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
  addCategory() {
    if (this.addForm.valid) {

      try {
        this.mainService.addCategory(
          this.addForm.value.title,
          this.addForm.value.slug,
          this.addForm.value.isParent,
          this.addForm.value.parentId,
          this.addForm.value.positionMode,
          this.addForm.value.index
        );
      } catch (error) { }

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
