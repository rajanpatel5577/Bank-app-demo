import { Component, OnInit } from '@angular/core';
import { AccModel } from 'src/app/shared/acc-model';
import { AccService } from 'src/app/shared/acc.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
activeAcc:AccModel=<AccModel>{};
totalBalance:number=0;

  constructor(private accService:AccService) { }

  ngOnInit(){
    this.activeAcc = this.accService.activeAcc;
    this.totalBalance = this.accService.totalBalance;

//   this.loginService.eportActiveAcc.subscribe((actACC:AccModel)=>{this.activeAcc = actACC})
this.accService.addTotalBalance.subscribe((b:number) =>{this.totalBalance = b});
  }

}
