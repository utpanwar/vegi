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
  cart$ : Observable<ShoppingCart>;
  constructor( private auth: AuthService,
              private shopingService:ShoppingCartService) {}
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
    this.cart$ = await this.shopingService.getCart();
  }
}
