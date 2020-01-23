import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/auth/authorization.service';
import { Product } from 'src/app/models/product';
import { ProductsService } from '../../services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  user: User;
  getUserSubscription: Subscription;
  productsArr: Product[];
  productsArrForPaginator: Product[];
  pageSizeOptions: number[] = [10, 20, 50];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;

  constructor(
    private authService: AuthorizationService,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserSubscription = this.authService.user$.subscribe(
      (user: User) => {
        if (user != null) {
          this.user = user;
          this.getProductsSubscribe();
        }
      }
    );
  }

  getProductsSubscribe() {
    this.productsService.getProducts(this.user.email).subscribe(
      (productsArr: Product[]) => {
        this.productsArr = productsArr;
        this.refreshProductsArrForPaginator();
      }
    );
  }

  editProfile() {
    this.router.navigate(['edit-profile']);
  }

  logout() {
    this.authService.logout();
  }

  refreshProductsArrForPaginator() {
    this.productsArrForPaginator = [];
    const from = this.pageIndex * this.pageSize;
    let to = this.pageIndex * this.pageSize + this.pageSize;
    if (to > this.productsArr.length) {
      to = this.productsArr.length;
    }
    for (let i = from; i < to; i++) {
      const product = { ...this.productsArr[i] };
      product.number = i + 1;
      this.productsArrForPaginator.push(product);
    }
  }

  createProduct() {
    this.router.navigate(['create-product']);
  }

  selectProduct(product: Product) {
    for (let i = 0; i < this.productsArr.length; i++) {
      if (this.productsArr[i].id === product.id) {
        this.productsArr[i] = product;
      }
    }
  }

  removeSelected() {
    const updatedProductsArr: Product[] = [];
    for (let i = 0; i < this.productsArr.length; i++) {
      if (this.productsArr[i].selected === false || this.productsArr[i].selected == null) {
        updatedProductsArr.push(this.productsArr[i]);
      }
    }

    this.productsService.updateProducts(this.user.email, updatedProductsArr).subscribe(
      (productsArr: Product[]) => {
        this.productsArr = productsArr;
        this.refreshProductsArrForPaginator();
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  pageEvent(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.refreshProductsArrForPaginator();
  }

  ngOnDestroy() {
    this.getUserSubscription.unsubscribe();
  }
}
