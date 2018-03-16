import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'product-detail',
    templateUrl: 'product-detail.component.html',
    styleUrls: []
})

export class ProductDetailComponent {
    selectedProduct:Product;
    quantity: number;
    constructor(
        private productService:ProductService,
        private route:ActivatedRoute,
        private location:Location,
        private cartService: CartService
    ) { }

    addToCart(product) {
        this.cartService.addToCart(product, this.quantity || 1);
    }

    ngOnInit() {
        this.route.params.forEach(param => {
            let id = parseInt(param['id'])
            this.selectedProduct = this.productService.getProduct(id)[0];
    
        })
    }

    goBack() {
        this.location.back()
    }

  get login(){
    return localStorage.getItem('loggedIn');
  }
}