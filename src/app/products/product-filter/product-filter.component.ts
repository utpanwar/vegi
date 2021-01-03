import { CategoryService } from './../../category.service';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent  {
  categories$;
@Input('category') category;

  constructor(private categoryService : CategoryService) 
  {
    console.log("%ci am child 1 prod-filter of product.ts component","color:blue; font-size:13px");
    this.categories$=this.categoryService.getCategories();
  }
  
ngOnDestroy() {
  console.log("%c i prod-filter.ts destroy","color:red; font-size:13px");
  
}

}
