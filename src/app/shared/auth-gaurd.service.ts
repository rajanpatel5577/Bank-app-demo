import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private loginService:LoginService, private route:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):| Observable<boolean> | Promise<boolean> | boolean{
    const loggedStatus = this.loginService.loggedIn;
    
    if(loggedStatus) {
     return true;
    } else {
     return this.route.navigate(['/login-page']);
    }
  }
}
