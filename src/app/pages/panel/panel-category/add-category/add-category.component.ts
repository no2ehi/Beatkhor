import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Input() public categories;
  @Input() public loading;
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder
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
      parent: ['', this.requiredIfIsParent],
      position: ['after', Validators.required],
      index: ['', Validators.required]
    });
  }

  /**
   * @description This makes the form input required only if category is parent
   * @param input 
   * @returns null If input is valid
   */
  requiredIfIsParent(input: FormControl) {
    const value = input.value;
    if (input.root.value.isParent) {
      if (value) {
        return null;
      } else {
        return 'err';
      }
    } else {
      return null;
    }
  }
}
