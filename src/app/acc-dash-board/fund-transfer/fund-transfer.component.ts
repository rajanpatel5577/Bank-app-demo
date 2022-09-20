import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccModel } from 'src/app/shared/acc-model';
import { AccService } from 'src/app/shared/acc.service';
import { CalculationService } from 'src/app/shared/calculation.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {

  fundTransferForm:FormGroup = <FormGroup>{}
  activeAcc:AccModel = <AccModel>{};
  totalBalance:number=0;

  constructor(private accService:AccService,private calcService:CalculationService) { }

  ngOnInit(){
    this.accService.exportActiveAcc.subscribe((data) => {
      this.activeAcc=data;
      this.totalBalance = this.calcService.calcTotalBalance(this.activeAcc);

    })
    this.accService.updateTotalBalance.subscribe((data) =>{this.totalBalance=data});

    this.fundTransferForm = new FormGroup({
      'uName' : new FormControl(null, Validators.required),
      'accNum' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, Validators.required),

    })
  }

  onSubmit(){
    const id = this.fundTransferForm.value.uName;
    const acc = this.fundTransferForm.value.accNum;
    const amount = this.fundTransferForm.value.amount;
    const indexOfTransferingAcc = this.accService.findAccIndex(id);
    const indexOfActiveAcc =this.accService.findAccIndex(this.activeAcc.userId);
 
    if(indexOfTransferingAcc === -1 || indexOfActiveAcc === indexOfTransferingAcc) alert("User account not found")
    if(this.fundTransferForm.value.amount > this.totalBalance) alert("Enough balance not available in your account")
    if(indexOfTransferingAcc > -1 && this.fundTransferForm.value.amount < this.totalBalance && indexOfActiveAcc != indexOfTransferingAcc ){
      console.log('execute')
      this.accService.removeAmount(indexOfActiveAcc,amount);
      this.accService.addAmount(indexOfTransferingAcc,amount,id);
    }
    this.fundTransferForm.reset()
  
}

}
