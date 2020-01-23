import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from '../utils/formHelper';
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthorizationService } from '../../services/auth/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthorizationService
  ) {
    this.createProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(FormHelper.productNameMaxLength)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(FormHelper.productDescriptionMaxLength)]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.createProductForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.createProductForm.invalid) {
      return;
    }

    this.productsService.createProduct(
      this.createProductForm.value,
      this.authService.user$.getValue().email
    ).subscribe(
      () => {
        this.router.navigate(['index']);
      },
      (err) => {
        console.warn(err);
      }
    );
  }

}
