import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {take } from 'rxjs/operators'

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

async getCart() //to read cartid from firebase
  {    let cartId = await this.getOrCreateCartId();
       return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() //to create a cartid or acceess the cartid 
  {
    let cartId = localStorage.getItem('cartId'); //to create a cartid or acceess the cartid 
    if(cartId) return cartId;
      let result = await this.create();    //here we call create method to create a cartid and store it in local storage
      localStorage.setItem('cartId' ,result.key);
      return result.key;
  }
    
  
  async addToCart(product : Product){   //here we add the cart to firebase
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key);
    let item$ = itemRef.snapshotChanges();
    item$.pipe(take(1)).subscribe(item=>{
      if(item.payload.exists()) itemRef.update({quantity: item.payload.val()['quantity']+1});
      else itemRef.set({product:product.$value, quantity:1});
    })
  }
  
}

