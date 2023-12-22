import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private productSrv: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productSrv.getProducts().subscribe( (products) => { this.products = products})

    this.route.queryParams.subscribe( (params) => {
      this.filter = params['filter'] ?? ''
      console.log(`Filter: ${this.filter}`)
    })
  }

  getFilteredProducts() {
    console.log(`getFilteredProducts with filter of: ${this.filter}`)
    return this.filter === '' || !this.products
      ? this.products
      : this.products.filter(
        (product: IProduct) => product.category === this.filter)
  }

  addToCart(product: IProduct) {
    this.cartSrv.add(product);
    this.router.navigate(['/cart'])
  }

}
