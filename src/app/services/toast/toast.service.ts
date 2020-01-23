// import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private ref = null;

  constructor(private notifier: MatSnackBar) { }

  show(msg: string, duration: number = 10000) {
    this.ref = this.notifier.openFromComponent(SnackBarComponent, {
      duration: duration,
      data: msg,
    });
  }
}
