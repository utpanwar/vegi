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
  //actually snapshot changes are rreturn obseervable<snapshot> but we changes this into
  //  observable of $key ,$value pair with the help of map operator
  // getAll(product)
  // {
  //   return this.db.list('/product').valueChanges();
  // }
  // this is not work it works in angular 4 beacuse valuechanges()  return the only value in the 
  // form of json array type Observable
  // but Snapshot returns metadata also like key of firebase .it returns key value pair  
  // get(productId)
  // {
  //    return this.db.object('/product/' + productId).snapshotChanges();
    // this also works fine 
  // }
  get(productId)
  {
     return this.db.object('/product/' + productId).valueChanges();
  }
   update(productID,product)
   {
     return this.db.object('/product/' + productID).update(product);
   }
   delete(productId)
   {
     return this.db.object('/product/' + productId).remove();
   }
}