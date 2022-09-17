import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { AccModel, statmentModel } from 'src/app/shared/acc-model';
import { AccService } from 'src/app/shared/acc.service';
import { CalculationService } from 'src/app/shared/calculation.service';

@Component({
  selector: 'app-statments',
  templateUrl: './statments.component.html',
  styleUrls: ['./statments.component.scss'],
})

export class StatmentsComponent implements OnInit {
// accsData:AccModel[]=[];
activeAcc:AccModel=<AccModel>{};
// statmentsArry:number[]=[];
totalDebit:number=0;
totalCredit:number=0;
totalBalance:number=0;

  constructor(private accService:AccService, private calcService:CalculationService) { }

  ngOnInit(): void{
    this.accService.exportActiveAcc.subscribe((data:AccModel) => {
      this.activeAcc=data;
      this.totalBalance=this.calcService.calcTotalBalance(this.activeAcc);
      this.totalCredit=this.calcService.calTotalCredit(this.activeAcc);
      this.totalDebit=this.calcService.calTotalDebit(this.activeAcc);
    });

  }
     

onClick(){

}

}
