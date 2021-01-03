import { ProductV } from './productValuecChanges';
import { Product } from './product';

export class ShoppingCartItem {
    constructor(public product : ProductV, public quantity : number){}
    // product : Product;
    // product : ProductV // it  is specially for valuechanges methods
    // quantity : number;

get totalprice()
 {       
    return this.product.price * this.quantity;
 }
}