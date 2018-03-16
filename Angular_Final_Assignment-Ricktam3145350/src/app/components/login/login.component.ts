import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/index';
import { Cart } from '../../models/cart';
import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    usercart :Cart;
    user : User ;
    model: any = {};
    error:any;
    constructor(private router : Router, private userService:UserService){}
    ngOnInit() {
    }

    login() {
       this.user = this.userService.checkUser(this.model)[0];
       if(this.user){
        this.userService.setLoggedInUser(this.user);
        this.router.navigate(["/"]);
       }
       else{
        this.error = "Username Password not matching";
       }
    }
}
