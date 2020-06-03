import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product : Product; // import from product.component.html product is of type { $key ,$value}
  // @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart;
   constructor(private cartService : ShoppingCartService) { }
 
  addToCart()
  {
     this.cartService.addToCart(this.product);
  }
  removeFromCart()
  {
   this.cartService.removeFromCart(this.product);
  }
 

}
