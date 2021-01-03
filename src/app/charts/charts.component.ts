import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  fileToUpload: File = null;
  datafromlocal : {
    id : string,
    name : string,
    description : string,
    price : number,
    imageUrl: string,
    quantity: number
  };
  file : any;
  constructor() { }

  handleFileInput(files)
   {
    // this.fileToUpload = files.item(0);
    this.file = files.target.files[0];

    console.log(this.file);
   }
   
   uploadDocument() {
     if(!this.file)
     {
         alert("please upload something");

         return ;
     } 
    let fileReader = new FileReader();
    let json = JSON.stringify(this.file);
    // const blob = new Blob([json], {type:"application/json"});
    fileReader.onload = () =>
    {
      // this.datafromlocal = JSON.parse(fileReader);
      // console.log(fileReader.result);
      let res = fileReader.result as string;
      console.log(fileReader.result as string);
      // const csv: string = typeof csv === 'string' ? csv : Buffer.from(csv).toString();
      console.log(JSON.stringify(res));
      this.datafromlocal = JSON.parse(res);
      console.log(this.datafromlocal);
      // let v = JSON.parse(fileReader.result);
      // let json = JSON.parse(fileReader.result);
    }
    fileReader.readAsText(this.file);
    console.log(this.file);
    
}


  ngOnInit() {
    console.log( this.fileToUpload);
  }

}
