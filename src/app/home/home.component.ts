import { CheckOutComponent } from './../check-out/check-out.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog : MatDialog) { }
  openDialog()
  {
    this.dialog.open(CheckOutComponent)
    .afterClosed()
    .subscribe(result =>  console.log(result));
  }

  ngOnInit() {
  }

}
