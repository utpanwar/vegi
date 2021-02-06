import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 constructor(private userService: UserService , private auth: AuthService , router: Router) {
   auth.user$.subscribe(user => {
     if (user) {
      console.log('subs in cons if user of app component');
      userService.save(user);
      // this.userService.get(user.uid).subscribe(x => console.log("say0",x));
      const returnUrl = localStorage.getItem('returnUrl');
      //  debugger;
      router.navigateByUrl(returnUrl);
      // console.log(returnUrl);
     }
     console.log('subs in cons if !(user) of app component');
    });
   console.log('cons of app.comp');
 }
  ngOnInit() {
    this.auth.check()
    .subscribe(x => console.log(x));
    this.userService.get().subscribe(x => console.log(x));
    console.log('init in app.component');
  }
}
