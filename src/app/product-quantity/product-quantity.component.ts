      
      // it handles the  (+) or  (-) buttons and add to cart in bootstrap cart and handles event on these

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit  {

  @Input('product') product : Product; // import from product-cart.component.html product is of type { $key ,$value}
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
  
ngOnInit()
{
  // console.log("ONINIT OF product-quantity.ts");
  console.log("parent cy -> = product.ts->product-cart.ts->product-quantity.ts");

}
}
