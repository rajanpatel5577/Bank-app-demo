import { EventEmitter, Injectable } from '@angular/core';
import { rejects } from 'assert';
import { RSA_SSLV23_PADDING } from 'constants';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { Subject } from 'rxjs';

import { AccModel } from './acc-model';
import { statmentModel} from './acc-model'
@Injectable({
  providedIn: 'root'
})
export class AccService {

accs:AccModel[] = [
  new AccModel('raju', 'rp', 1111, 12, 'saving', [
    new statmentModel('13/06/2022', 'debit', 1000),
    new statmentModel('13/06/2022', 'debit', 5000),
    new statmentModel('13/06/2022', 'credit', -1000),
    new statmentModel('13/06/2022', 'credit', -1700)
  ]),
  new AccModel('teju', 'tp', 2222, 13,'saving',[
    new statmentModel('13/06/2022', 'debit', 1000),
    new statmentModel('13/06/2022', 'debit', 5000),
    new statmentModel('13/06/2022', 'credit', -1000),
    new statmentModel('13/06/2022', 'credit', -1700),
    new statmentModel('13/06/2022', 'credit', -1000),

  ]),
  new AccModel('chiku','cp', 3333, 14,'saving', [
    new statmentModel('13/06/2022', 'debit', 1000),
    new statmentModel('13/06/2022', 'debit', 5000),
    new statmentModel('13/06/2022', 'credit', -1000),
    new statmentModel('13/06/2022', 'credit', -1700),
    new statmentModel('13/06/2022', 'debit', 1000),

  ]),
  new AccModel('vaishu','vs', 4444, 15,'saving', [
    new statmentModel('13/06/2022', 'debit', 1000),
    new statmentModel('13/06/2022', 'debit', 5000),
    new statmentModel('13/06/2022', 'debit', 1000),
    new statmentModel('13/06/2022', 'credit', -1000),
    new statmentModel('13/06/2022', 'credit', -1700)
  ])

]

  constructor() { }
activeAcc:AccModel=<AccModel>{};
totalBalance:number=0;
totalCredit:number=0;
totalDebit:number=0;


loginVerify(id:string,pwd:number){
  let status:Boolean=false;
  this.accs.find((acc) => {
    if(acc.userId === id && acc.password === pwd) {
    status=true;
    this.activeAcc = acc;
    this.totalBalance = this.activeAcc.statments.map(m => m.amount).reduce((total,amount) => total+amount);
    this.totalCredit = this.activeAcc.statments.map(m => m.amount).filter(n => n<0).reduce((t,a) => t+a);
    this.totalDebit = this.activeAcc.statments.map(m => m.amount).filter(n => n>0).reduce((t,a) => t+a);
    }
  }
);
return status;
}

addTotalBalance = new Subject<number>();
addTotalCredit = new Subject<number>();
addTotalDebit = new Subject<number>();
addInTotalBalance() {
this.addTotalBalance.next(this.totalBalance);
};
addInTotalCredit() {
  this.addTotalCredit.next(this.totalCredit);
};
addInTotalDebit() {
  this.addTotalDebit.next(this.totalDebit);
};




addAmount(id:string,num:number,amount:number){
   this.accs.find((acc)=> {
      if(acc.userId === id){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yy = today.getFullYear();
        let transationDate = `${dd}/${mm}/${yy}`
        acc.statments.push(new statmentModel(transationDate, 'debit', amount));
        this.totalBalance +=amount;
        console.log(this.totalBalance)
        this.addInTotalBalance();
        this.addInTotalDebit();
      }
     })
}

removeAmount(id:string,num:number,amount:number){
  this.accs.find((acc)=> {
     if(acc.userId === id){
       acc.statments.push(new statmentModel(Date(), 'credit', amount));
     }
    })
}


}
