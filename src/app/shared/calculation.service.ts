import { Injectable } from '@angular/core';
import { AccModel } from './acc-model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  calcTotalBalance(acc:AccModel){
    return acc.statments.reduce((t,d) => d.movementType === 'credit'? t+d.amount : t-d.amount,0);
    //  return acc.statments.map(m => m.amount).reduce((total,amount) => total+amount,0);
  }

  calTotalCredit(acc:AccModel){
    return acc.statments.reduce((t,d) => d.movementType === 'credit'? t+d.amount:t+0,0)
    // return acc.statments.map(m => m.amount).filter(n => n>0).reduce((t,a) => t+a,0);  
  }

  calTotalDebit(acc:AccModel){
    return acc.statments.reduce((t,d) => d.movementType === 'debit'? t+d.amount:t+0,0)
    // return acc.statments.filter((f) => f.movementType==='debit').map((m) => m.amount).reduce((t,a) => t+a,0);
    // return acc.statments.map(m => m.amount).filter(n => n<0).reduce((t,a) => t+a,0);
  }

}
