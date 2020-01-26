import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() selectProduct: EventEmitter<Product> = new EventEmitter(null);
  @Output() openDescription: EventEmitter<boolean> = new EventEmitter(null);
  opened = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  open(e) {
    this.opened = true;
    this.openDescription.emit(e);
  }

  close() {
    this.opened = false;
  }

  edit() {
    this.router.navigate(['update-product/' + this.product.id]);
  }

  checkedChange(e) {
    const product = { ...this.product };
    product.selected = e.checked;
    this.selectProduct.emit(product);
  }

}
