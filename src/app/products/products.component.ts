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

  // product$: any;
  products=[];
  filteredProducts=[];
  // categories$ : any;
  category: any;
  // cart : any;
  subscribe :Subscription;
  constructor(private productService : ProductService, 
              private categoryService : CategoryService,
              private route :ActivatedRoute)
              // private shoppingCartService :ShoppingCartService) 
  {
   
    
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
      
     
    // here we have two asyn call so we dont know which one is executed first so shows blank page on 
    // startup product array is empty we solve this with the switchMap operator


   }
  
  //  async ngOnInit(){
  //    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //    //Add 'implements OnInit' to the class.
  //    this.subscribe= (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
  //  }

  //  ngOnDestroy(){
  //   this.subscribe.unsubscribe();
  // }
}
