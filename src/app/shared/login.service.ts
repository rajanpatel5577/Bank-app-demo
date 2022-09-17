import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { AccModel } from './acc-model';
import { AccService } from './acc.service';
import {map, subscribeOn} from 'rxjs/operators'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

accs:AccModel[] = [];
loggedIn=false;

activeAcc:AccModel=<AccModel>{};
totalBalance:number=0;
totalDebit:number=0;
totalCredit:number=0;



  constructor(private accService:AccService, private route:Router,private http:HttpClient) { }

fatchedstatus=false;
login(id:string,pwd:number){
  if(!this.accService.loginVerify(id,pwd)) alert('Invalid user id/pwd')
  if(this.accService.loginVerify(id,pwd)){
    this.loggedIn=true;
    console.log(this.accService.accs)
    this.accService.fatchData();
    this.route.navigate(['/acc-dash-board'])
  }









// this.totalBalance = this.activeAcc.statments.map(m => m.amount).reduce((total,amount) => total+amount);
// this.totalDebit = this.activeAcc.statments.map(m => m.amount).filter(n => n<0).reduce((t,a) => t+a);
// this.totalCredit = this.activeAcc.statments.map(m => m.amount).filter(n => n>0).reduce((t,a) => t+a);
 }

logOut(){
  this.loggedIn=false;
  // this.activeAcc=<AccModel>{};
}


}

