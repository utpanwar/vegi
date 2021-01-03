import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MethodCall } from '@angular/compiler';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  category$;
  product = <any>{};
  id;
  constructor(private categoryService : CategoryService,
             private productService : ProductService,
             private route : ActivatedRoute,
             private router :Router) {
    this.category$ = categoryService.getCategories();
                  
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
     if(this.id)
     {
      //  this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p.payload.val());
      //  as we all see we get key from snapshot MethodCall
      //  if we are want value we use valuechges on services 
      //  and it like this is also fine 
       this.productService.get(this.id).pipe(take(1))
       .subscribe(p => this.product = p);
       console.log(this.id+" error in productform com coming from get");
     } 
   }
   save(product)
   {
     if(this.id) this.productService.update(this.id,product);
     else this.productService.create(product);

      this.router.navigate(['/admin/products']);
   }
   delete()
   {
     if(!confirm('Are you Sure')) return ;
     this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);
   }

  ngOnInit() {
    console
    .log("%ci prod.quan.ts going to destroy","color:red; font-size:13px");
  }

}
