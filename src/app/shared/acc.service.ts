import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map, subscribeOn} from 'rxjs/operators'
import { AccModel } from './acc-model';
import { statmentModel} from './acc-model'
@Injectable({
  providedIn: 'root'
})
export class AccService {

// accs1:AccModel[] = [
//   new AccModel('raju', 'rp', 1111, 12, 'saving', [
//     new statmentModel('13/06/2022', 'credit', 1000),
//     new statmentModel('13/06/2022', 'credit', 5000),
//     new statmentModel('13/06/2022', 'debit', -1000),
//     new statmentModel('13/06/2022', 'debit', -1700)
//   ]),
//   new AccModel('teju', 'tp', 2222, 13,'saving',[
//     new statmentModel('13/06/2022', 'credit', 1000),
//     new statmentModel('13/06/2022', 'credit', 5000),
//     new statmentModel('13/06/2022', 'debit', -1000),
//     new statmentModel('13/06/2022', 'debit', -1700),
//     new statmentModel('13/06/2022', 'debit', -1000),

//   ]),
//   new AccModel('chiku','cp', 3333, 14,'saving', [
//     new statmentModel('13/06/2022', 'credit', 1000),
//     new statmentModel('13/06/2022', 'credit', 5000),
//     new statmentModel('13/06/2022', 'debit', -1000),
//     new statmentModel('13/06/2022', 'debit', -1700),
//     new statmentModel('13/06/2022', 'credit', 1000),

//   ]),
//   new AccModel('vaishu','vs', 4444, 15,'saving', [
//     new statmentModel('13/06/2022', 'credit', 1000),
//     new statmentModel('13/06/2022', 'credit', 5000),
//     new statmentModel('13/06/2022', 'credit', 1000),
//     new statmentModel('13/06/2022', 'debit', -1000),
//     new statmentModel('13/06/2022', 'debit', -1700)
//   ])

// ]

accs:AccModel[]=[];
fatchingData=false;
eportFatching = new Subject<boolean>();
activeId:string='';
activeIdPwd:number=0;
activeAcc:AccModel=<AccModel>{};
exportActiveAcc = new Subject<AccModel>();
eA = new EventEmitter<AccModel>();
totalBalance:number=0;
totalCredit:number=0;
totalDebit:number=0;


  constructor(private http:HttpClient ) {}


accLoginVerify:{id:string,pwd:number}[]= [
  {id:'rp',pwd:1111},
  {id:'tp',pwd:2222},
  {id:'cp',pwd:3333},
  {id:'vs',pwd:4444},
]


loginVerify(id:string,pwd:number){
  let status:Boolean=false;
  this.accLoginVerify.find((acc) => {
    if(acc.id === id && acc.pwd === pwd) {
    status=true; 
    this.activeId=id;
    this.activeIdPwd=pwd;
    }
  }
);
return status;
}



getDate(){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yy = today.getFullYear();
  let transationDate = `${dd}/${mm}/${yy}`
  return transationDate
}



addAmount(id:string,num:number,amount:number){
   this.accs.find((acc)=> {
      if(acc.userId === id){
        acc.statments.push(new statmentModel(this.getDate(), 'credit', amount));
      }
     })
}

removeAmount(id:string,num:number,amount:number){
  this.accs.find((acc)=> {
     if(acc.userId === id){
       acc.statments.push(new statmentModel(this.getDate(), 'debite', amount));
       console.log(this.accs)
     }
    })
}

fatchData(){
  this.fatchingData=true;
  this.http.get<{[key:string]:AccModel}>('https://new-data-18667-default-rtdb.firebaseio.com/posts.json'
  ).pipe(
    map((responseData) => {
      console.log(responseData)
      const dataArry:AccModel[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          dataArry.push({...responseData[key]})
        }
      }
      return dataArry;
    })).subscribe((data) => {
      this.accs=data;
      this.accs.forEach((acc) => {
        if(acc.userId == this.activeId ){
          this.activeAcc = acc;
          this.fatchingData = false;
          this.eportFatching.next(this.fatchingData);
          setTimeout(() =>{this.exportActiveAcc.next(this.activeAcc);},2000) 
        }
       })
    
    })
  }   


}
