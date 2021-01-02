import { OnDestroy } from '@angular/core';
      
      // it handles the  (+) or  (-) buttons and add to cart in bootstrap cart and handles event on these

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

// work:- it handles the + or - buttons
                  // CHILD COMPONENT : NO;
                  //  PARENT COMPONENT(CONSUMERS) : YES
                      // a.product-cart and product.ts
@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit,OnDestroy  {
  
  
  @Input('product') product : Product; // import from product-cart.component.html product is of type { $key ,$value}
  // @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart; //import from produt-cart and product.ts
   constructor(private cartService : ShoppingCartService)
    {
      // var style = 'color: tomato; background:#eee; -webkit-text-stroke: 1px black; font-size:30px;';
      // console.log('%cHi, We are Happy 😆 to have you as our customer', style );
      // console.log("%cJavascript Jeep 🚙in Blue %cJavascript Jeep 🚙in red", "color:blue; font-size:50px", "color:red; font-size:50px" );
      console
      .log
      ("%c i am child prod-quan.ts of product-cart.ts component & prod-cart is a child of prod.ts",
      "color:blue; font-size:13px");
    }
 
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
  console.log("%c thisis Oninit parent cy -> = product.ts->product-cart.ts->product-quantity.ts",
  "color:yellow; font-size:13px");

}
ngOnDestroy()
{
  console
  .log("%ci prod.quan.ts going to destroy","color:red; font-size:13px");
}
}
