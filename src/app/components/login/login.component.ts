import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import FormHelper from '../utils/formHelper';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['email@email.com', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      password: ['123QWEqwe',
        [
          Validators.required,
          Validators.minLength(FormHelper.passwordMinLength),
          Validators.maxLength(FormHelper.passwordMaxLength),
          Validators.pattern(FormHelper.passwordPattern)
        ]],
    });
  }

  ngOnInit() { }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        this.authService.user$.next(response);
        this.router.navigate(['index']);
        localStorage.setItem('email', this.loginForm.value.email);
      },
      err => {
        this.toastService.show(err.error.error);
        console.warn(err);
      }
    );
  }

}
