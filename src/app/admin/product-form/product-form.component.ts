import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  category$;
  product = <any>{};
  constructor(private categoryService : CategoryService,
             private productService : ProductService,
             private route : ActivatedRoute,
             private router :Router) {
    this.category$ = categoryService.getCategories();
                  
    let id = this.route.snapshot.paramMap.get('id');
     if(id)
     {
       this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p.payload.val());
       console.log(id);
     } 
   }
   save(product)
   {
       console.log(product);
       this.productService.create(product);
       this.router.navigate(['/admin/products']);
   }

  ngOnInit() {
  }

}
