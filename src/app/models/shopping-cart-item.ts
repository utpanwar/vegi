import { ProductV } from './productValuecChanges';
import { Product } from './product';

export interface ShoppingCartItem {
    // product : Product;
    product : ProductV // it  is specially for valuechanges methods
    quantity : number;
}