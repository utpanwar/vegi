import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { NgControlStatusGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent   {

  // product$: any;
  products=[];
  filteredProducts=[];
  categories$ : any;
  category: any;
  constructor(private productService : ProductService, 
              private categoryService : CategoryService,
              private route :ActivatedRoute) 
  {
    this.categories$=this.categoryService.getCategories();
    
    this.productService.getAll().subscribe(products => this.products=products);
    // here we have two asyn call so we dont know which one is executed first so shows blank page on 
    // startup product array is empty we solve this with the switchMap operator

    route.queryParamMap
    .subscribe(params => 
     { this.category = params.get('category');
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.$value.category === this.category) :
      this.products
    });

   }



}
