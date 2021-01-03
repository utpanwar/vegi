import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  fileToUpload: File = null;
  fr : any;
  datafromlocal : {
    id : string,
    name : string,
    description : string,
    price : number,
    imageUrl: string,
    quantity: number
  };
  file : any;
  constructor() 
  {
    this.fr = new FileReader();
  }

  handleFileInput(files)
   {
    this.file = files.target.files[0];
   }
   
   uploadDocument() 
   {
     if(!this.file)
     {
         alert("please upload something");
         return ;
     } 
     this.fr.onload = () =>
     {
       let res = this.fr.result as string;
       this.datafromlocal = JSON.parse(res);
       console.log(this.datafromlocal);
     }
    this.fr.readAsText(this.file);
    
  }


  ngOnInit() {
    console.log( this.fileToUpload);
  }

}
