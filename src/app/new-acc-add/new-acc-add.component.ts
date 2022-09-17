import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccModel, statmentModel } from '../shared/acc-model';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-new-acc-add',
  templateUrl: './new-acc-add.component.html',
  styleUrls: ['./new-acc-add.component.scss']
})
export class NewAccAddComponent implements OnInit {
  addNewAcc:FormGroup = <FormGroup>{};
  addTranjection:FormGroup = <FormGroup>{};
  accs:AccModel=<AccModel>{};
  filledForm=false;

  constructor(private accService:AccService, private http:HttpClient) { }

  ngOnInit(): void {
    this.addNewAcc = new FormGroup({
      'userName' : new FormControl(null,Validators.required),
      'userID' : new FormControl(null,Validators.required),
      'password' : new FormControl(null,Validators.required),
      'accNum' : new FormControl(null,Validators.required),
      'accType' : new FormControl(null,Validators.required),
    })

    this.addTranjection = new FormGroup({
      'date' : new FormControl(null,Validators.required),
      'movementType' : new FormControl(null,Validators.required),
      'amount' : new FormControl(null,Validators.required),
    })
  }



  onNext(){
    this.accs = new AccModel(
      this.addNewAcc.value.userName, 
      this.addNewAcc.value.userID, 
      this.addNewAcc.value.password, 
      this.addNewAcc.value.accNum,
      this.addNewAcc.value.accType,
      []
      )

      this.filledForm=true;

  
  }

  onAddTranjection(){
    
    this.accs.statments.push(new statmentModel(
      this.addTranjection.value.date,
      this.addTranjection.value.movementType, 
      this.addTranjection.value.amount));
  
      // console.log(this.accs.statments);
      this.addTranjection.reset();
  }

  saveData(){
    console.log(this.accs);
       this.http.post('https://new-data-18667-default-rtdb.firebaseio.com/posts.json', this.accs
  ).subscribe((data) => {console.log(data)}) 

  this.filledForm=false;
  this.addNewAcc.reset()
  }

  accs1:AccModel = new AccModel('chiku','cp', 3333, 14,'saving', [
        new statmentModel('13/06/2022', 'credit', 1000),
        new statmentModel('13/06/2022', 'credit', 5000),
        new statmentModel('13/06/2022', 'debit', -1000),
        new statmentModel('13/06/2022', 'debit', -1700),
        new statmentModel('13/06/2022', 'credit', 1000),
    
      ])

      onClick(){
    console.log(this.accs1)
    // this.http.post('https://new-data-18667-default-rtdb.firebaseio.com/posts.json/NC9BCDo9aldrK_onQEq', this.accs1
    // ).subscribe((data) => {console.log(data)}) 
  }
onDelete(){
  console.log('run')
  this.http.delete('https://new-data-18667-default-rtdb.firebaseio.com/posts.json').subscribe((data) => {console.log(data);alert('Data deleted from database')}) 
}
}
