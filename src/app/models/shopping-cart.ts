import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    items : ShoppingCartItem[] = [];
   constructor(public itemMaps : { [productId : string] : ShoppingCartItem}){
     this.itemMaps = itemMaps || {};
     for(let productId in itemMaps)
     {
        let item = itemMaps[productId];
        this.items.push(new ShoppingCartItem(item.product,item.quantity));
     }
   }
    // as we know that items is model takes data from the firebase observale it this 
    // time firebase returns as an object so we hhave to convert this int o arrays by this method
    // get productIds()
    // {
    //   return Object.keys(this.items);// this returns the objects inside the item as an array
    // }
    getQuantity(product : Product)
    {
      // console.log(product);
      let item = this.itemMaps[product.$key];
      return item ? item.quantity : 0;
    }
    get totalPrice()
    {
      let sum =0 ;
      for( let productId in this.items)
      {
        sum +=this.items[productId].totalprice;
      }
      return sum;
    }
    get totalItemCount()
    {
        let count=0;
        for(let productId in this.itemMaps)
        {
          count += this.itemMaps[productId].quantity
        }
        return count;
    }
    // get totalPrice()
    // {
    //   return this.items[productId].quantity * this.items[productId].product.price;
    // }
    
}