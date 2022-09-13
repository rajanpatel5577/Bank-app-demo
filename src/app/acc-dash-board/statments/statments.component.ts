import { Component, EventEmitter, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { AccModel, statmentModel } from 'src/app/shared/acc-model';
import { AccService } from 'src/app/shared/acc.service';

@Component({
  selector: 'app-statments',
  templateUrl: './statments.component.html',
  styleUrls: ['./statments.component.scss'],
})

export class StatmentsComponent implements OnInit {

activeAcc:AccModel=<AccModel>{};
// statmentsArry:number[]=[];
totalDebit:number=0;
totalCredit:number=0;
totalBalance:number=0;

  constructor(private accService:AccService) { }

  ngOnInit(){
    this.activeAcc = this.accService.activeAcc;
    this.totalCredit = this.accService.totalCredit;
    this.totalDebit = this.accService.totalDebit;
    this.accService.addTotalCredit.subscribe((b:number) =>{this.totalBalance = b});
    this.accService.addTotalDebit.subscribe((b:number) =>{this.totalBalance = b});



  }
     

onClick(){
  
// console.log(this.accService.totalBalance())
}

}
