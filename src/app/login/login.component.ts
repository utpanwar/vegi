import { AuthService } from './../auth.service';
import { Component, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  contactMethod = [
    {id : 1, name : 'Email'},
    {id : 2, name : 'Phone'},
    {id : 3, name : 'Address'}
  ]
  log(x)
  {
    console.log(x);
  }

  Submit(f)
  {
    console.log(f); // it prints the complete object of ngForm
    console.log(f.value);//it print the only vale in that form in key:value
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
