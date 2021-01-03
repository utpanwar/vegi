import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { ProductsComponent } from './../../products/products.component';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products : {$key : string ,$value : any}[];
  filteredProducts : any[];
  subscription :Subscription;
  // products$=[]; if we subscribe getall() beacause  getall return any key,value array observable and intial it 
  //is empty and so in the admin .hmtl it give null property errors so use it , but now this handle byh async
  constructor(private productService :ProductService) {
    // this.products$ = this.productService.getAll();
    this.subscription = this.productService.getAll()
    .subscribe(products => {this.products = this.filteredProducts = products ; console.log(this.products+" "+"hi")});
    // console.log(this.products$);
    // this.productService.getAll().subscribe(re=>console.log(re));
    //this method use to see the object in console 
   }
//  as we all see we get key from snapshot MethodCall
      //  if we are want value we use valuechges on services 
    // it is essential to it has the get key method then it pass that in the adim component from package.$key
    filters(query :string)
    {
         console.log(query);
         this.filteredProducts = (query) ?
         (this.products.filter(p => p.$value.title.toLowerCase().includes(query.toLowerCase()))) :
         (this.products);
    }
    // filters(query: string) {
    //   this.filteredProducts = (query) ?
    //     this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
    //     this.products;
    // }

  ngOnInit() {
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
