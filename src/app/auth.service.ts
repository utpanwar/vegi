import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, } from 'rxjs/operators';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
              private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router
              ) {
                 this.user$ = afAuth.authState;
                 let user$2=afAuth.authState.subscribe(x => console.log('sub in cons of auth'));
                //  debugger;
                 console.log('const of auth.service');
               }
   login() {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      console.log(returnUrl);
      localStorage.setItem('returnUrl' , returnUrl) ;
      this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   }
   
   check() {
   return new Observable(subscriber => {
    // subscriber.next(1);
    // subscriber.next(2);
    // subscriber.next(3);
    setTimeout(() => {
      subscriber.next(Math.random());
    }, 0);
  });
}
   logout() {
    this.afAuth.signOut();
   }

  //  get appUser$() : Observable<AppUser> {
  //   return this.user$
  //   .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()));
  //  }
  get appUser$(): Observable<AppUser> {
    // uid is the property of the 'user' object is the user represented by firebase as part of authentication and not the user object stored in the database
    // We need to get the firebase 'user' object to read and read the actual application 'user' object from the database
    return this.user$.pipe(
      switchMap(user => {
        if (user)
          return this.userService.get(user.uid);
        else
          return of(null);
      })
    );
  }
}
