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

  // product$: any;
  products=[];
  filteredProducts=[];
  categories$ : any;
  category: any;
  constructor(private productService : ProductService, 
              private categoryService : CategoryService,
              private route :ActivatedRoute) 
  {
    this.productService.getAll().subscribe(products => this.products=products);
    this.categories$=this.categoryService.getCategories();
    console.log(this.categories$);

    route.queryParamMap
    .subscribe(params => 
     { this.category = params.get('category');
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.$value.category === this.category) :
      this.products
    });

   }



}
