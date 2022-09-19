import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccModel } from '../shared/acc-model';
import { AccService } from '../shared/acc.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn=false;
  activeAcc:AccModel=<AccModel>{}
  constructor(private loginService:LoginService, private accService:AccService, private route:Router) { }

  ngOnInit(){
 this.accService.exportActiveAcc.subscribe((data) => {
  this.activeAcc = data;
 })
  }

  logOut(){
    this.loginService.logOut();
    this.route.navigate(['/login-page'])
  }

  navClick=false;
  navBar(){
    this.navClick=!this.navClick;
  }

}
