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
    this.categories$=this.categoryService.getCategories();
  }
  


}
