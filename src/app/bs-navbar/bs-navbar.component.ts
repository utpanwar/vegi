// this component manage the full navbar like dropdown, logout,shopping cart in the routing 
// and it having routing to the shoping cart and all the dropdown options
// CHILD COMPONENT : NO;
// FUNLITY : logout the user(not changing the route) ,


import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../shopping-cart.service';
// import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import * as firebase from 'firebase';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  // cart$ : Observable<ShoppingCart>;
  constructor( private auth: AuthService,
              public shopingService:ShoppingCartService) 
  {
    console.log("i am bs-navbar component");
  }
  logout()
  {
    this.auth.logout();
  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties,
    //  and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser); // Subscribing here to avoid
    //  using the async pipe in the html template that causes infinite loop
    console.log("Triggered Oninit by bs-navbar.cop.ts")
    // this.cart$ = await this.shopingService.getCart();
    // what is await working here ?
    // await is working like a .then in promise as we hover on the getRtlScrollAxisType() methd
    // we can see it return the Promise<Observable<ShoppingCart>> type and cart$ is of type 
    // Observable<ShoppingCart>; . now await converts the promise into (consume or unwrap or map )
    // like the .then method
    // console.log("bs-oninit"+" " +this.cart$);
    console.log("ONINIT OF bs-navbar page data ends")
  }
}
