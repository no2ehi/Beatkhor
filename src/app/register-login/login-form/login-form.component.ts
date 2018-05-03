import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MainService]
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  public hidePass;

  constructor(
    private mainService: MainService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  /**
   * @description Creating the form using FormBuilder.
   */
  createLoginForm() {
    const fromControles = {
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
    this.loginForm = this.fb.group(fromControles);
  }

}
