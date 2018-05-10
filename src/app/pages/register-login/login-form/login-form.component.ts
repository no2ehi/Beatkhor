import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from './../../../services/main.service';
import { CommonService } from './../../../services/common.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MainService]
})
export class LoginFormComponent implements OnInit {

  @Output() public onModeChange = new EventEmitter();
  loginForm: FormGroup;
  hidePass;
  loading = false;

  constructor(
    private mainService: MainService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  /**
   * @description Creating the form using FormBuilder.
   */
  createLoginForm(): void {
    const fromControles = {
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
    this.loginForm = this.fb.group(fromControles);
  }

  /**
   * @description Emit the "onModeChange" event to tell parent "change to register mode" component
   */
  changeMode(): void {
    this.onModeChange.emit('register');
  }

  /**
   * @description Sends the data to the server and does the login progress
   */
  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.updateValueAndValidity()
    } else {

      this.loading = true;
      try {
        const userData = await this.mainService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        this.mainService.setauthorization(userData);
        this.router.navigate(['/p']);
        this.loading = false;
      } catch (error) {
        switch (error.error) {
          case 'UserNotExists_Email':
            this.commonService.showSnackBar('کاربری با این ایمیل وجود ندارد!', 'فهمیدم');
            break;
          case 'UserNotExists_Username':
            this.commonService.showSnackBar('کاربری با این نام کاربری وجود ندارد!', 'فهمیدم');
            break;
          case 'WrongPassword':
            this.commonService.showSnackBar('رمز عبور اشتباه است!', 'فهمیدم');
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
