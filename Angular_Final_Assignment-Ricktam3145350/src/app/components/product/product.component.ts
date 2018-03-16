import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {
  
  namePattern:any;
  products:Product[];
  quantity: number;

  constructor (private productService:ProductService, private router:Router,private cartService:CartService) {

  }

  clickedProduct(product) {
    let link = ['/detail', product.id]; 
    this.router.navigate(link);
  }

  addToCart(product) {
    console.log(this.quantity)
    this.cartService.addToCart(product, this.quantity || 1);
  }

  getProductData() {     
    this.products= this.productService.getProducts();
  }

  ngOnInit() {
    this.getProductData()
  }

  get login(){
    return localStorage.getItem('loggedIn');
  }

  filterProducts(){
    this.products = this.productService.getProducts().filter(products => products.name.toLowerCase().match(this.namePattern.toLowerCase()))
  }

}