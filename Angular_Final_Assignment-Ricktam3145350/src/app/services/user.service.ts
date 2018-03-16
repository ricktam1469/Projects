import { Injectable } from "@angular/core";
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import { USERS } from "../models/user-data";

@Injectable()
export class UserService{

    constructor(private cartService:CartService,private router:Router){}
    setLoggedInUser(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('loggedIn', "true");
        console.log("logged in ? "+localStorage.getItem('loggedIn'))
        this.cartService.setSessionCart(user.id);
    }

    logout(){
        localStorage.setItem("loggedIn","false");
        localStorage.setItem('currentUser', "");
        localStorage.setItem('cart', "");
        this.router.navigate(["/"]);
    }

    checkUser(model){
        return USERS.filter(user => user.username === model.username && user.password === model.password);
    }
}