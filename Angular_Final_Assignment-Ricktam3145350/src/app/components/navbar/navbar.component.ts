import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Cart } from '../../models/cart';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: []
})
export class NavBarComponent {

  constructor(private productService:ProductService, private userService:UserService) {}

  getTotalPrice() {
    let totalCost: Array<number> = []
    let quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number

  }
  ngOnInit() {
  }

  logout(){
    this.userService.logout();

  }

  get login(){
    return localStorage.getItem('loggedIn');
  }

  get currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  get cart(){
    return JSON.parse(localStorage.getItem('cart')); 
  }
  
}
