import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map, subscribeOn} from 'rxjs/operators'
import { AccModel } from './acc-model';
import { statmentModel} from './acc-model'
import { CalculationService } from './calculation.service';
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
accsCopy:AccModel[]=[];
exportError= new Subject<string>();


  constructor(private http:HttpClient, private calcService:CalculationService ) {}


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


updateTotalBalance = new Subject<number>();
updateTotalDebit = new Subject<number>();

addAmount(accIndex:number,amount:number,id:string){
  this.accs[accIndex].statments.push(new statmentModel(this.getDate(), 'credit', amount));
  console.log(this.accsCopy);
  this.accsCopy = this.accs.slice();
  console.log(this.accsCopy);

// Deleting database
  this.http.delete('https://new-data-18667-default-rtdb.firebaseio.com/posts.json')
  .subscribe((data) => {console.log(data)})
  console.log(this.accs)
// adding new database
this.accs.forEach((acc) =>{
  this.http.post('https://new-data-18667-default-rtdb.firebaseio.com/posts.json', acc
).subscribe((data) => {
  console.log(data);
}) 
});
alert(`${amount}  transfered successfully to ${id}'s account`);
}

removeAmount(accIndex:number,amount:number){
  this.accs[accIndex].statments.push(new statmentModel(this.getDate(), 'debit', amount));
  this.updateTotalBalance.next(this.calcService.calcTotalBalance(this.activeAcc));
  this.updateTotalDebit.next(this.calcService.calTotalDebit(this.activeAcc));

}

findAccIndex(id:string){
 let num:number=-1;
  this.accs.find((acc) => {
    if(acc.userId === id ){
      num = this.accs.indexOf(acc);
    }
  })
  return num;
}

fatchData(){
  this.fatchingData=true;
  // this.http.get<{[key:string]:AccModel}>('https://new-data-18667-default-rtdb.firebaseio.com/posts.json').subscribe((data) => console.log(data))
  this.http.get<{[key:string]:AccModel}>('https://new-data-18667-default-rtdb.firebaseio.com/posts.json'
  ).pipe(
    map((responseData) => {
      console.log(responseData);
      const dataArry:AccModel[] = [];
      console.log(dataArry);
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          dataArry.push({...responseData[key]})
      console.log(dataArry);

        }
      }
      return dataArry;
    })).subscribe((data) => {
      this.accs=data;
      this.accs.forEach((acc) => {
        if(acc.userId === this.activeId ){
          this.activeAcc = acc;
          this.fatchingData = false;
          this.eportFatching.next(this.fatchingData);
          this.exportActiveAcc.next(this.activeAcc);
        }
       })
    },(error) => {
      this.exportError.next(error.message)
    })
  }   


}
