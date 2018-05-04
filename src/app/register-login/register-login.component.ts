import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RegisterLoginComponent implements OnInit {

  mode = 'login';
  constructor() { }

  ngOnInit() {
  }

  /**
   * @description This Function will be executed "onModeChange" event
   * @param {string} modeName - A slug that each mode has
   */
  changeMode(modeName: string): void {
    this.mode = modeName;
  }

}
