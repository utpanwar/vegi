import { Component, OnInit } from '@angular/core';
import { NgxCsvParser   } from 'ngx-csv-parser';
import { NgxCSVParserError    } from 'ngx-csv-parser';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  fileToUpload: File = null;
  // type : boolean;
  chart : [];
  csvRecords: any[] = [];
  header = true;

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
  constructor(private ngxCsvParser: NgxCsvParser) 
  {
    this.fr = new FileReader();
  }

  handleFileInput(files)
   {
    this.file = files.target.files[0];
    // console.log(this.file);
    //  console.log(this.file.name.endsWith('.csv'));
    // console.log(this.file.type);
   }
   
   uploadDocument() 
   {
     if(!this.file)
     {
         alert("please upload something");
         return ;
     }
     if(this.file.name.endsWith('.csv'))
     {
      this.ngxCsvParser.parse(this.file, { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
 
        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
     }
     else
     {
      this.fr.onload = () =>
      {
        let res = this.fr.result as string;
        this.datafromlocal = JSON.parse(res);

        this.chart = new Chart('canvas' , {
          type  : 'line',
          data :{
            labels :this.csvRecords,
            datasets : [
              {
                data : this.datafromlocal,
                borderColor: '0#3ba9f',
                fill :false,
              },

              {
                data : this.datafromlocal,
                borderColor: '0#3ba9f',
                fill :false,
              }
            ]
          },
          options: {
            legend :{
              display :false
            // responsive: true,
            // title: {
            //   display: true,
            //   text: 'Chart.js Line Chart'
            // },
            // tooltips: {
            //   mode: 'index',
            //   intersect: false,
            // },
            // hover: {
            //   mode: 'nearest',
            //   intersect: true
            },
            scales: {
              xAxes: [{
                display: true,
                // scaleLabel: {
                //   display: true,
                //   labelString: 'Month'
                // }
              }],
              yAxes: [{
                display: true,
                // scaleLabel: {
                //   display: true,
                //   // labelString: 'Value'
                // }
              }]
            }
          }
      })



        console.log(this.datafromlocal);
      }
     this.fr.readAsText(this.file);
     } 
  }


  ngOnInit() {
    console.log( this.fileToUpload);
  }

}
