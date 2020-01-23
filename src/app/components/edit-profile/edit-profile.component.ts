import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from '../utils/formHelper';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.editProfileForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(FormHelper.userNameMaxLength)]],
      lastName: ['', [Validators.maxLength(FormHelper.userLastNameMaxLength)]],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      phone: ['', [Validators.pattern(FormHelper.phonePattern)]],
    });
  }

  ngOnInit() {
    this.authService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (user: User) => {
        this.user = user;
        this.setFormValues();
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  setFormValues() {
    this.editProfileForm.setValue({
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
    });
  }

  get formControls() {
    return this.editProfileForm.controls;
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '250px',
      data: { password: 'PSWD' }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editProfileForm.invalid) {
      return;
    }

    this.authService.updateUserProfile(this.user.email, this.editProfileForm.value).subscribe(
      (user: User) => {
        localStorage.setItem('email', user.email);
        this.authService.user$.next(user);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
