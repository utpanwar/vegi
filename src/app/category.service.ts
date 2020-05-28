import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { componentFactoryName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }

  getCategories()
  {
    return this.db.list('/categories',).snapshotChanges();
    //  i add here vluechanges myself so it is works there is major changes oterwise it breaks at 
    // product form html in asyn pipe and in angular 4 it works without valuechanges
    // value changes is not work with key in product-form componentFactoryName.html
    // so snapshotChanges is having the key data (metadata)

  }
  getCategoriesforHomepage()
  {
    return this.db.list('/categories',).valueChanges();
    //  i add here vluechanges myself so it is works there is major changes oterwise it breaks at 
    // product form html in asyn pipe and in angular 4 it works without valuechanges
    // value changes is not work with key in product-form componentFactoryName.html
    // so snapshotChanges is having the key data (metadata)

  }
}
