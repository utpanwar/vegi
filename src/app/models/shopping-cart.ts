import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    
   constructor(public items : ShoppingCartItem[]){}
    get productId()
    {
      return Object.keys(this.items);
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