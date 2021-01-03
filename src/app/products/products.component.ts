import { ShoppingCart } from './../models/shopping-cart';

                  //  it takes component for the category and the bootstrap cart
                  // CHILD COMPONENT : YES;
                  //  1. product-filter
                  //  2.product-cart
                          // a. product-quantity
import { ShoppingCartService } from './../shopping-cart.service';
import { filter, switchMap } from 'rxjs/operators';
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

  // product$: any;
  products=[];
  filteredProducts=[];
  // categories$ : any;
  category: any;
  // cart : ShoppingCart;
  subscribe :Subscription;
  // while constructor is part of ES6 JavaScript class
  // const should be used for only DI, it is creater first while the component tree is created all the const are
  // initialized
  constructor(private productService : ProductService, 
              private categoryService : CategoryService,
              private route :ActivatedRoute ,
              public shoppingCartService :ShoppingCartService) 
  {
    
    console.log("%c i am product.ts component","color:blue; font-size:13px");
    this.productService.getAll().pipe(
    switchMap(products => {
      this.products=products;
      return route.queryParamMap;
    }))
      .subscribe(params => 
       { this.category = params.get('category');
         console.log(this.category);
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.$value.category === this.category) :
        this.products
        console.log(this.filteredProducts);
        console.log(this.category);
      });
      
     
    // here we have two asyn call so we dont know which one is executed first so shows blank page on 
    // startup product array is empty we solve this with the switchMap operator


   }
  //  OK, first of all ngOnInit is part of Angular lifecycle hook it is called after the componet tree and 
  // onChange() hook
  //ngOninit call after the component tree is created or it is called after default changedetectection() hook
//   ngOnChanges is called when an input or output binding value changes
// ngOnInit is called after the first ngOnChanges
// Component interpolated template and input initial values aren't 
// available in constructor, but they are available in ngOnInit


// Asynchronous initialization

// Asynchronous initialization constructor can often be considered 
// antipattern and have smell because class instantiation finishes before asynchronous 
// routine does, and this can create race conditions. If it's not the case, 
// ngOnInit and other lifecycle hooks are better places for this, particularly
//  because they can benefit from async syntax: so here we use asyn call in ngOnit

// flow is here
// Constructor() --> ngOnChanges() --> ngOnInit()5432w1q  `
   async ngOnInit(){
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.
     console.log("Triggered ONINIT by product.component.ts");
    //  this.subscribe= (await this.shoppingCartService.getCart()).subscribe(cart => {this.cart = cart;
      // The ngOnInit() hooks only once after all directives are instantiated.
      //  If you have subscription insidengOnInit() 
      //  and it's not unsubscribed then it will run again if the subscribed data changes
      // console.log(cart)
      console.log("this cart data comes from product OnInit in last because they subscribe it");
      // console.log(this.cart);
      console.log("end ONINIT of product.component.ts");
    
   }
  //  getCart return object of shoppingCart class so we deorate this in to shoppingCart


  // async ngOnInit(){
  //   console.log("Triggered ONINIT by product.component.ts");
  //   this.subscribe= (await this.shoppingCartService.getCart())
  //   .subscribe(cart => {this.cart = cart; console.log("UT"+" "+this.cart)})
  //   console.log("UTKARSH" +" "+ this.cart);
  //   console.log("end ONINIT of product.component.ts");
  // }

  //  ngOnDestroy(){
  //   this.subscribe.unsubscribe();
  //   // console.log("UTKARSH" +" "+ JSON.stringify(this.cart));
  //   console
  //  .log("%ci prod.ts going to destroy","color:red; font-size:13px");
  // }
}
