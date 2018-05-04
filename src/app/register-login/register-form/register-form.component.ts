import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() public onModeChange = new EventEmitter();
  registerForm: FormGroup;
  hidePass;

  constructor(
    private mainService: MainService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  /**
   * @description Creating the form using FormBuilder.
   */
  createRegisterForm(): void {
    const fromControles = {
      nickName: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator]]
    }
    this.registerForm = this.fb.group(fromControles);
  }

  /**
   * @description This is a custom validator for password confirmation.
   */
  passwordConfirmValidator(input: FormControl) {
    const value = input.value;
    if (value === input.root.value.password) {
      return null;
    } else {
      return 'Not_Equal';
    }
  }

  /**
   * @description Emit the "onModeChange" event to tell parent "change to register mode" component
   */
  changeMode(): void {
    this.onModeChange.emit('login');
  }

}
