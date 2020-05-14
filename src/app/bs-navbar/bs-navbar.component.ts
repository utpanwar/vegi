// import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$
      .subscribe(appUser => this.appUser = appUser); // Subscribing here to avoid using the async pipe in the html template that causes infinite loop
  }
  logout()
  {
    this.auth.logout();
  }

}
