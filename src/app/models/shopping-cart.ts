import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    items : ShoppingCartItem[] = [];
   constructor(public itemMaps : { [productId : string] : ShoppingCartItem}){
     for(let productId in itemMaps)
     {
        this.items.push(itemMaps[productId]);
     }
   }
    // as we know that items is model takes data from the firebase observale it this 
    // time firebase returns as an object so we hhave to convert this int o arrays by this method
    // get productIds()
    // {
    //   return Object.keys(this.items);// this returns the objects inside the item as an array
    // }
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