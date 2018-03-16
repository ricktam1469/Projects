import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: [],
})
export class CartComponent {

  //public cart = [];
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;

  constructor(private productService:ProductService,private router:Router,private cartService:CartService){}

  removeProduct(entry) {
    this.cartService.removeProduct(entry);
  }

  checkout() {
    this.cartService.removecart();
    alert('Order Number :'+Math.floor((Math.random() * 1000000) + 1)+' has been dispatched to your Address')
    
  }

  /*
  getTotalPrice() {
    let totalCost: Array<number> = []
    let quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number
    this.cart.forEach((item, i) => {
      intPrice = parseInt(item.price)
      intQuantity = parseInt(item.quantity)
      totalCost.push(intPrice)
      quantity.push(intQuantity)
    })

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item
    }, 0)
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item
    }, 0)
  }
 
  ngOnInit() {
    this.cartSubscription = this.cartStore.getState().subscribe(res => {
      this.cart = res.products
      this.getTotalPrice()
    })
  }
 */
ngOnDestroy() {
  this.router.navigate(["/"]);
}

  get cart(){
    return JSON.parse(localStorage.getItem('cart'));
  }
  
}
