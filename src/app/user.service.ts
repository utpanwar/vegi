import { AppUser } from './models/app-user';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { console.log('const of user.serice')}

  save( user: firebase.User)
  {
    this.db.object('/users/' + user.uid).update({
      name : user.displayName,
      email : user.email,
    });
  }
  // get(uid : string) : AngularFireObject<AppUser>
  // {
  //   return this.db.object('/user/' + uid);
  // }
  get(uid ?: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
