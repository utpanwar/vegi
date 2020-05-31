import { ShoppingCart } from './models/shopping-cart';
import { async } from '@angular/core/testing';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {take ,map} from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService 
{

  constructor(private db: AngularFireDatabase) { }


  create()
  {
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    })
  }

private getItem(cartId: string, productId: string)
{
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).snapshotChanges();
}

async getCart() : Promise<Observable<ShoppingCart>>//to read cartid from firebase
  {    let cartId = await this.getOrCreateCartId();
       let ref=  this.db.object('/shopping-carts/' + cartId);
       let ref1=  this.db.object('/shopping-carts/' + cartId).valueChanges().subscribe(x => console.log(x));
       return ref.valueChanges().pipe(map( (x : ShoppingCart) => new ShoppingCart(x.items)));
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
  private async getOrCreateCartId() //to create a cartid or acceess the cartid 
  {
    let cartId = localStorage.getItem('cartId'); //to create a cartid or acceess the cartid 
    if(cartId) return cartId;
      let result = await this.create();    //here we call create method to create a cartid and store it in local storage
      localStorage.setItem('cartId' ,result.key);
      return result.key;
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
}

