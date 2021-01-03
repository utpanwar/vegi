import { ShoppingCart } from './models/shopping-cart';
import { async } from '@angular/core/testing';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject, SnapshotAction } from '@angular/fire/database';
import { Injectable , OnInit} from '@angular/core';
import {take ,map} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService 
{
  subscribe :Subscription;
  dart : any;
  id :any;
  // cartIdFire : SnapshotAction<unknown>[];
  cartIdFire : any;
  cart : ShoppingCart;
  cart$ : Observable<ShoppingCart>;
  carttmp : Observable<ShoppingCart>;
  constructor(private db: AngularFireDatabase) 
  {
    // this.carttmp =  this.getCart().then(result => this.cart$ = result);
    // this.cart$.subscribe(res => this.cart = res);
    this.first();
  }
  private async first()
  {
    this.carttmp = await this.getCart().then(result => this.cart$ = result);  
    this.cart$.subscribe(res => this.cart = res);
  }
  private  create()
  { // push method return the promise  so we are able to await it 
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
      });
  }

private getItem(cartId: string, productId: string)
{
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).snapshotChanges();
}

async getCart() : Promise<Observable<ShoppingCart>>//to read cartid from firebase
  {    let cartId =  await this.getOrCreateCartId();
       let ref=  this.db.object('/shopping-carts/' + cartId);
       let ref1=  this.db.object('/shopping-carts/' + cartId).snapshotChanges().subscribe(x => console.log("getcart()"+" "+x));
       return ref.snapshotChanges()
       .pipe(map( (x : any) =>
       { 
         const key = x.key;
         const item = x.payload.val().items;
         return new ShoppingCart(item);
        }));
                                            // x is having dateCreated, items property 
                                           // as a object we pass directly these 
                                            // and ShoppinCArt is fpr intelligence or  replica of
                                            // property of x here we are not passing date created



  }

                    // map is used to map the object coming from firebase according to 
                    // our data model ShoppingCart here it is object of dateCreated and items


// async getCart(): Promise<Observable<ShoppingCart>> {
//   const cartId = await this.getOrCreateCartId();
//   const cart = this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
//     map((result: any) => {
//       const key = result.key;
//       const items = result.payload.val().items;
//       return new ShoppingCart(key,items); //this 2 key and items are error
//     })
//   );
//   return cart;
// }
  private  getServer() 
  {
       return  this.db.list('/shopping-carts/').snapshotChanges()
       .pipe(take(1)).toPromise();
      //  .subscribe(x => this.cartIdFire = x);
      //  if(this.cartIdFire)
      //  {
      //    console.log(this.cartIdFire);
      //    return "hey";
      //  }
       
      // return this.db.list('/shopping-carts/')
      // .snapshotChanges()
      // .pipe(map(changes => changes.map(c => ({
      //   $key: c.payload.key
      // }))));
  } 
  private async resol(id : Promise<SnapshotAction<unknown>[]>)
  {
    console.log(id);
    // this.cartIdFire = id;
    id.then(x =>{ this.cartIdFire = x;
      console.log(x);
    });
    console.log(this.cartIdFire);
     return "hi";
  }
  private async getOrCreateCartId() //to create a cartid or acceess the cartid 
  {
    let cartId = localStorage.getItem('cartId'); //to create a cartid or acceess the cartid 
    if(cartId) 
    {
      return cartId;
    }
    this.id =  this.getServer()
    .then(result => {
      console.log('From Promise:', result);
      this.cartIdFire = result;
    });
    // .then(x => this.cartIdFire = x);
    //  (await this.getServer()).subscribe(x => this.cartIdFire = x);
    //  this.cartIdFire.subscribe(x => this.id =x);
    // this.id = await this.db.list('/shopping-carts/').snapshotChanges()
    //                 .toPromise()
    //                 .then(x => this.cartIdFire = x);
    // this.id.then(x => this.cartIdFire = x);
    // let id2 = await this.resol(this.id);
    // console.log(id2);
     console.log(this.id);
     console.log(this.cartIdFire);
    if(this.cartIdFire)
    {
      return this.cartIdFire;     
    } 
      // let result =  await this.create();    //here we call create method to create a cartid and store it in local storage
      // console.log("getOrCreateCartId()"+ " " +result);
      // localStorage.setItem('cartId' ,result.key);
      // console.log("hi");
      // return  result.key;
      return "ji";
  }
     
    
     
  async addToCart(product : Product){   //here we add the cart to firebase
    this.updateItemQuantity(product,1);
  }
  
  async removeFromCart(product : Product)
  {
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product : Product,change : number)
  {
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key);
    let item$ = itemRef.snapshotChanges();
    item$.pipe(take(1)).subscribe(item=>{
      if(item.payload.exists()) itemRef.update({quantity: item.payload.val()['quantity']+change});
      else itemRef.set({product:product.$value, quantity:1});
    })
  }
//   private async updateItemQuantity(product : Product,change : number)
//   {
//     let cartId = await this.getOrCreateCartId();
//     let itemRef = this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key);
//     let item$ = itemRef.snapshotChanges();
//     item$.pipe(take(1)).subscribe(item=>{
//       // if(item.payload.exists())
//       let quantity = (item.payload.val()['quantity'] || 0)+change;
//       if(quantity===0) itemRef.remove();
//       else
//        itemRef.update({
//          product:product.$value ,
//          quantity: quantity
//       // else 
//       // itemRef.set({product:product.$value, quantity:1});
//     });});
  
// }
 ngOnInit()
 {
   console.log("NGON");
   this.cart$.subscribe(res => this.cart = res);
 }
  }
