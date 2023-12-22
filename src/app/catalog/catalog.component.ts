import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: any;
  filter: string = '';

  constructor(
    private cartSrv: CartService,
    private productSrv: ProductService
  ) { }

  ngOnInit() {
    this.productSrv.getProducts().subscribe( (products) => { this.products = products})
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product: IProduct) => product.category === this.filter)
  }

  addToCart(product: IProduct) {
    this.cartSrv.add(product);
  }

}
