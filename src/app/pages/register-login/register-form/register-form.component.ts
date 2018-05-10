import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { MainService } from './../../../services/main.service';
import { CommonService } from './../../../services/common.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() public onModeChange = new EventEmitter();
  loading = false;
  registerForm: FormGroup;
  hidePass;

  constructor(
    private mainService: MainService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router
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
      return 'Not equal values!';
    }
  }

  /**
   * @description Emit the "onModeChange" event to tell parent "change to register mode" component
   */
  changeMode(): void {
    this.onModeChange.emit('login');
  }

  /**
   * @description Registration process and sending data to server
   */
  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.updateValueAndValidity();
    } else {

      try {
        this.loading = true;
        const result = await this.mainService.registerUser(
          this.registerForm.value.nickName,
          this.registerForm.value.email,
          this.registerForm.value.password,
          'music_producer'
        );
        this.mainService.setauthorization(result);
        this.router.navigate(['/p']);
        this.loading = false;
      } catch (error) {
        console.log(error.error);
        switch (error.error) {
          case 'UserExists':
            this.commonService.showSnackBar('در حال حاظر کاربری با این ایمیل وجود دارد!', 'فهمیدم');
            break;
          case 'BadRequest':
            this.commonService.showSnackBar('درخواست ثبت نام دارای مشکل است!', 'فهمیدم');
            break;
          case 'ServerError':
            this.commonService.showSnackBar('خطا در سرور! لطفا بعداً امتحان کنید.', 'فهمیدم');
            break;
        }
        if (error.status === 0) {
          this.commonService.showSnackBar('خطا در اتصال به سرور!', 'فهمیدم');
        }
        this.loading = false;
      }
    }
  }

}
