import { Injectable } from "@angular/core";
import { CARTS } from "../models/cart-data";
import { Cart } from "../models/cart";
import { User } from "../models/index";
import { cartEntries } from "../models/cartentries";

@Injectable()
export class CartService{
    getCarts() {
        return CARTS;
    }

    getUserCart(id) {
        return this.getCarts().find(cart => cart.userId === id);
    }

    setSessionCart(id){

        localStorage.setItem('cart', JSON.stringify(this.getUserCart(id)));
    }

    removecart(){
        var user :User;
        var cart :Cart;
        var entry:cartEntries;
        user = JSON.parse(localStorage.getItem('currentUser'));
        cart=this.getCarts().find(cart => cart.userId === user.id);
        cart.entries=[];
        cart.totalPrice=0;
        cart.totalQuantity=0;
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    removeProduct(cartentry){
        var user :User;
        var cart :Cart;
        var entry:cartEntries;
        user = JSON.parse(localStorage.getItem('currentUser'));
        console.log('remove,', cartentry)
        cart=this.getCarts().find(cart => cart.userId === user.id);
        entry = cart.entries.find(entry => entry.id === cartentry.id);
        cart.entries.splice(cart.entries.indexOf(entry),1)
        //cart.entries = cart.entries.filter(entry => entry.id != entry.id);
        cart.totalQuantity = cart.totalQuantity-entry.quantity;
        cart.totalPrice=cart.totalPrice-(entry.quantity*entry.productprice);
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    addToCart(product, quantity) {
        var user :User;
        var cart :Cart;
        var entry:cartEntries;
        user = JSON.parse(localStorage.getItem('currentUser'));
        console.log('add,', product)
        cart=this.getCarts().find(cart => cart.userId === user.id);
        entry = cart.entries.find(entry => entry.product.id === product.id);
        
        if(entry){
        entry.quantity= entry.quantity + quantity;
        entry.totalprice = entry.quantity * entry.productprice;
       
        }
        else{
        entry = {id:cart.entries.length+1,product:product,quantity:quantity,totalprice:product.price*quantity,productprice:product.price};
        cart.entries.push(entry);    
        }
        cart.totalQuantity = cart.totalQuantity+quantity;
        cart.totalPrice=cart.totalPrice+(quantity*entry.productprice);

        localStorage.setItem('cart',JSON.stringify(cart));
    }

}