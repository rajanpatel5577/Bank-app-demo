import { Component, OnInit } from '@angular/core';
import { AccModel } from 'src/app/shared/acc-model';
import { AccService } from 'src/app/shared/acc.service';
import { CalculationService } from 'src/app/shared/calculation.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
activeAcc:AccModel=<AccModel>{};
totalBalance:number=0;

  constructor(private accService:AccService, private calcService:CalculationService) { }

  ngOnInit(){
    this.accService.exportActiveAcc.subscribe((data) =>{
      this.activeAcc =data;
      this.totalBalance = this.calcService.calcTotalBalance(this.activeAcc);
    })

    this.accService.updateTotalBalance.subscribe((data) =>{this.totalBalance=data})


  }

}
