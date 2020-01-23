import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from '../utils/formHelper';
import { ToastService } from 'src/app/services/toast/toast.service';
import { matchOtherValidator } from 'src/app/services/validators/validators';
import { AuthorizationService } from '../../services/auth/authorization.service';


@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private toastService: ToastService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['',
        [
          Validators.required,
          Validators.minLength(FormHelper.passwordMinLength),
          Validators.maxLength(FormHelper.passwordMaxLength),
          Validators.pattern(FormHelper.passwordPattern)
        ]],
      rePassword: ['', [Validators.required, matchOtherValidator('password')]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.changePasswordForm.controls;
  }

  changePassword() {
    this.submitted = true;

    if (this.changePasswordForm.valid) {
      this.dialogRef.close();
    } else {
      return;
    }

    this.authService.updatePassword(
      this.authService.user$.getValue().email,
      this.changePasswordForm.value.password
    ).subscribe(
      () => { },
      err => {
        console.warn(err);
      }
    );
  }

}
