import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgControlStatusGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent   {
  products=[];
  filteredProducts=[];
  category: any;
  cart : ShoppingCart;
  subscribe :Subscription;

  constructor(private productService : ProductService, 
              private categoryService : CategoryService,
              private route :ActivatedRoute ,
              private shoppingCartService :ShoppingCartService) 
  {
    
    console.log("ji");
    this.productService.getAll().pipe(
    switchMap(products => {
      this.products=products;
      return route.queryParamMap;
    }))
      .subscribe(params => 
       { this.category = params.get('category');

        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.$value.category === this.category) :
        this.products
      });
    }


   async ngOnInit(){
     console.log("Triggered ONINIT by product.component.ts");
     this.subscribe= (await this.shoppingCartService.getCart()).subscribe(cart => {this.cart = cart;
      console.log(cart)
      console.log
      ("this cart data comes from product OnInit in last because they subscribe it")});
      console.log(this.cart);
      console.log("end ONINIT of product.component.ts");
    
   }
   ngOnDestroy(){
    this.subscribe.unsubscribe();
  }
}
