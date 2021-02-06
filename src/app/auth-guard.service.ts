import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot , ActivatedRouteSnapshot} from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { 
    console.log('cons of auth.guard.service.ts');
  }
  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    console.log('canactivate method called not subs');
    // console.log("canactivate",state.url);
    return  this.auth.user$.pipe(map(user => {
      if (user) {
        // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') 
        // console.log("url");
        console.log('subs of canactivate and if user');
        localStorage.setItem('returnUrl' , state.url) ;
        // console.log("STATAATTTTT",JSON.stringify(state.url));
        return true;
      }
      // console.log('state', state);
      console.log('subs of canactivate and if !user');
      this.router.navigate(['/login'], { queryParams: { returnUrl : state.url }});
      return false;
    }));
    // console.log(m);
    // let d = m;
    // d.subscribe(x => console.log(x));
    // return m;
  }
}
