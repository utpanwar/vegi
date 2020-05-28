import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent   {

  product$: any;
  constructor(private productService : ProductService) 
  {
    this.product$=this.productService.getAll();
   }



}
