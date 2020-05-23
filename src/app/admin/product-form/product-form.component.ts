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
  id;
  constructor(private categoryService : CategoryService,
             private productService : ProductService,
             private route : ActivatedRoute,
             private router :Router) {
    this.category$ = categoryService.getCategories();
                  
    this.id = this.route.snapshot.paramMap.get('id');
     if(this.id)
     {
       this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p.payload.val());
       console.log(this.id);
     } 
   }
   save(product)
   {
     if(this.id) this.productService.update(this.id,product);
     else this.productService.create(product);

      this.router.navigate(['/admin/products']);
   }

  ngOnInit() {
  }

}
