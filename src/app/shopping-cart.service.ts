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
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
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
    
  // async addToCart(product : Product)
  // {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key).snapshotChanges();
  //   console.log(item$);
  //   let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
  //   console.log(item$$);
  //   item$.pipe(take(1)).subscribe( (item : any) => {
  //     if( item === null ) {
  //               item$$.set({product: product, quantity: 1});
  //               console.log('adding new product to cart');
  //           }else{
  //               item$$.update({quantity: item.quantity + 1});
  //               console.log('updating exisiting product ');
  //          }
  //         });
  // }

  // async addToCart(product){                    //here we add the cart to firebase
 
  //   let cartId=await this.getOrCreateCartId();
  //   let item$=this.db.object('/shopping-carts/'+cartId+ '/items/'+product.key);
 
  //   item$.snapshotChanges().pipe(take(1)).subscribe((item :any)=>{
  //     if(item.payload.val())
  //     item$.update({ quantity:item.payload.val().quantity +1 })
  //     else
  //     item$.set({ product:product.payload.val() , quantity:1 })
  //   })
  // }
  async addToCart(product){   //here we add the cart to firebase
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key);
    let item$ = itemRef.snapshotChanges();
    item$.pipe(take(1)).subscribe(item=>{
      if(item.payload.exists()) itemRef.update({quantity: item.payload.val()['quantity']+1});
      else itemRef.set({product:product.$value, quantity:1});
    })
  }
  // async addToCart(product : Product) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);
  //   let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
  //   item$.pipe(take(1)).subscribe( (item : any) => {
  //      if( item === null ) {
  //         item$$.set({product: product, quantity: 1});
  //         console.log('adding new product to cart');
  //     }else{
  //         item$$.update({quantity: item.quantity + 1});
  //         console.log('updating exisiting product ');
  //    }
  //   });
  // }

}
