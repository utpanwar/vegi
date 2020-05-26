import { ProductService } from './../../product.service';
import { ProductsComponent } from './../../products/products.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProductsComponent implements OnInit {
  products$;
  constructor(private productService :ProductService) {
    this.products$ = this.productService.getAll();
    // console.log(this.products$);
    // this.productService.getAll().subscribe(re=>console.log(re));
    //this method use to see the object in console
   }
//  as we all see we get key from snapshot MethodCall
      //  if we are want value we use valuechges on services 
    // it is essential to it has the get key method then it pass that in the adim component from package.$key
  ngOnInit() {
  }

}
