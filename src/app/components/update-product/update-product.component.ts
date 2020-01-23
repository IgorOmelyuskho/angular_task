import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from '../utils/formHelper';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthorizationService,
    private route: ActivatedRoute
  ) {
    this.updateProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(FormHelper.productNameMaxLength)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(FormHelper.productDescriptionMaxLength)]],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.getProductById(id).subscribe(
      (product: Product) => {
        this.product = product;
        this.setFormValues();
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  get formControls() {
    return this.updateProductForm.controls;
  }

  setFormValues() {
    this.updateProductForm.setValue({
      name: this.product.name,
      price: this.product.price,
      description: this.product.description
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateProductForm.invalid) {
      return;
    }

    this.productsService.updateProductById(
      this.product.id,
      this.updateProductForm.value
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
