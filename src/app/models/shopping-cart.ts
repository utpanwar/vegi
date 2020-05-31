import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    
   constructor(public items : ShoppingCartItem[]){}
    // as we know that items is model takes data from the firebase observale it this 
    // time firebase returns as an object so we hhave to convert this int o arrays by this method
    get productIds()
    {
      return Object.keys(this.items);// this returns the objects inside the item as an array
    }
    get totalItemCount()
    {
        let count=0;
        for(let productId in this.items)
        {
          count += this.items[productId].quantity
        }
        return count;
    }
    // get totalPrice()
    // {
    //   return this.items[productId].quantity * this.items[productId].product.price;
    // }
    
}