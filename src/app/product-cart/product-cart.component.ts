import { OnInit, OnDestroy } from '@angular/core';
              //  it is the component of cart and take ptoduct-quantity as a component
                // CHILD COMPONENT : YES;
                  //  1.product-quantity
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit,OnDestroy {
 @Input('product') product : Product; // import from product.component.html product is of type { $key ,$value}
 @Input('show-actions') showActions=true;
 @Input('shopping-cart') shoppingCart; // it is the data comes from the  service backend
  constructor(private cartService : ShoppingCartService)
   {
    console.log("%c i am child 2 prod.cart of product.ts component",
    "color:blue; font-size:13px");
  }

 addToCart()
 {
    this.cartService.addToCart(this.product);
 }
//  removeFromCart()
//  {
//   this.cartService.removeFromCart(this.product);
//  }
//  getQuantity()
//  {
//    if(!this.shoppingCart) return 0;
//    let item = this.shoppingCart.items[this.product.$key];
//    return item ? item.quantity : 0;
//  }

    ngOnInit()
    {
      //  console.log("ONINIT OF product-cart.ts call from means parent of this ");
      var style = 
      'color: tomato; background:#eee; -webkit-text-stroke: 1px black; font-size:13px;';
      //  console.log("%cparent cy -> = product.ts->product-cart.ts",style);
    }

 ngOnDestroy()
  {
  console
  .log("%ci prod-cart.ts going to destroy","color:red; font-size:13px");
  }
}
