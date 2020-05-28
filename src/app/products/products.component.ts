import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent   {

  product$: any;
  categories$ : any;
  category: any;
  constructor(private productService : ProductService, 
              private categoryService : CategoryService,
              private route :ActivatedRoute) 
  {
    this.product$=this.productService.getAll();
    this.categories$=this.categoryService.getCategories();
    // .subscribe(result =>console.log(result));
    // console.log(this.categories$)
    route.queryParamMap
    .subscribe(params => 
      this.category = params.get('category'));

   }



}
