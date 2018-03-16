import { Injectable } from '@angular/core';
import { PRODUCTS } from '../models/product-data';
import { Product } from '../models/Product'; 
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProductService {

    constructor() {

    }

    getProducts() {
        return PRODUCTS
    }

    getProduct(id) {
        return this.getProducts().filter(product => product.id === id);
    }

}