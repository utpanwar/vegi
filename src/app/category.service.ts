import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }

  getCategories()
  {
    return this.db.list('/categories',).valueChanges();
    //  i add here vluechanges myself so it is works there is major changes oterwise it breaks at 
    // product form html in asyn pipe and in angular 4 it works without valuechanges
  }
}
