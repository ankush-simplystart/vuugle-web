import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){

  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAuth = true; 
      this.isSessionActive().then((value) => {
          if(!value) {
            this.router.navigate(['login'])
          }
          isAuth = value;
      });
     return isAuth;
  }


  async isSessionActive(): Promise<boolean>{
    let isAuth = await this.authService.isLoggedIn()
    if(isAuth == undefined){
      return new Promise(async(resolve) => {
        let res = await this.authService.isLoggedIn();
        resolve(res)
      })
    } else {
      return isAuth;
    }
  }
}