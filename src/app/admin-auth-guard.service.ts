import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap,map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private auth  : AuthService , private userService : UserService) { }

//   canActivate(): Observable<boolean> {
//     return this.auth.user$
//    .pipe(switchMap(user=> {
//        return this.userService.get(user.uid).valueChanges()
//        }),
//        map(appUser=> appUser.isAdmin));
//  }
   
//    canActivate(): Observable<boolean> {
//     return this.auth.user$.switchMap(user => 
//     this.userService.get(user.uid)).map((appUser :any) => appUser.isAdmin);
//  }

canActivate(): Observable<boolean> {
  return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin) // Mapping App user observable to a boolean observable
  );
}
}