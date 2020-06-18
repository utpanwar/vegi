import { AuthService } from './../auth.service';
import { Component, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  constructor(private auth : AuthService) {
   }


 login()
 {
    this.auth.login();
 }
 ngOnDestroy()
 {
   console.log("%c i login.com.ts destroy", "color:red; font-size:13px");
 }
}
