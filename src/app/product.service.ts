import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db : AngularFireDatabase) { }
  

  create(product)
  {
    
    return this.db.list('/product').push(product);
  }
  getAll() {
    return this.db.list('/product')
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({
        $key: c.payload.key, $value: c.payload.val()
      }))));
  }
  // getAll(product)
  // {
  //   return this.db.list('/product').valueChanges();
  // }
  // this is not work it works in angular 4
}