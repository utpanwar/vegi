import { OnDestroy } from '@angular/core';
  //  it handles data inside the table under the shopping cart tab
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {
  cart$ : Observable<ShoppingCart>;
  constructor(private shoppingCartService :ShoppingCartService) { }

  async ngOnInit() {
    console.log(" ONINIT OF SHOPPING-CART handle data inside the table or caleed shoping cart page")
    this.cart$ = await this.shoppingCartService.getCart();
    console.log(this.cart$);
    console.log("ONINIT OF SHOPPING-CART shopping cart page data ends")
  }
  ngOnDestroy()
  {
    console.log("%c i shoping-cart destroy", "color:red; font-size:13px");
  }
}
