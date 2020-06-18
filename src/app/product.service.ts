import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  constructor(private db : AngularFireDatabase) { }
  

  create(product)
  {
    
    return this.db.list('/product').push(product);
  }
  // getAll() {
  //   return this.db.list('/product')
  //     .snapshotChanges()
  //     .pipe(map(changes => changes.map(c => ({
  //       $key: c.payload.key, $value: c.payload.val()
  //     }))));
  // } 
  getAll() {
    let ref= this.db.list('/product').snapshotChanges();
    // let ref1= this.db.list('/shopping-carts/'+'-M8QvjNaV7ev2eoB_ZPt').snapshotChanges();
    // // let ref2= this.db.list('/product').snapshotChanges();
    // ref1.subscribe(x =>{ console.log(x); console.log("go")});
    // ref2.subscribe(x =>{ console.log(x); console.log("go2")});
      //  ref1.pipe(map(c => ({
      // $key: c.payload.key, $value: c.payload.val()
      // // console.log("ji");
      // }))).subscribe(x => console.log(x));
      
      // ref1.pipe(map(changes => changes.map(c => ({   
      //   $key: c.payload.key, $value: c.payload.val()
      // })))).subscribe(x => console.log(x));
    // like in .sub we have payload and key in each object inside the Array
    // now extract exact data with set theese two property
     return  ref.pipe(map(changes => changes.map(c => ({
        $key: c.payload.key, $value: c.payload.val()
      }))));
    //  ref1.pipe(map(c => ({
    //   $key: c.payload.key, $value: c.payload.val()
    //   // console.log("ji");
      
    // })));
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
   ngOnDestroy()
   {
    console.log("%c i product.service destroy" ,"color:red; font-size:13px");
   }
}