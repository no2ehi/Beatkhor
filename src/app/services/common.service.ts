import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CommonService {

  constructor(public snackBar: MatSnackBar) { }

  showSnackBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action || null, {
      duration: duration || 8000,
      direction: 'rtl',
      horizontalPosition: 'right',
      panelClass: 'customSnackBar'
    });
  }

}
