import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccModel } from 'src/app/shared/acc-model';
import { AccService } from 'src/app/shared/acc.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {

  fundTransferForm:FormGroup = <FormGroup>{}
  activeAcc:AccModel = <AccModel>{};

  constructor(private accService:AccService) { }

  ngOnInit(){
    this.activeAcc = this.accService.activeAcc;
    this.fundTransferForm = new FormGroup({
      'uName' : new FormControl(null, Validators.required),
      'accNum' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, Validators.required),

    })
  }

  onSubmit(){
    this.accService.addAmount(this.fundTransferForm.value.uName,this.fundTransferForm.value.accNum,this.fundTransferForm.value.amount);
    this.accService.removeAmount(this.activeAcc.userId,this.activeAcc.accNum,this.fundTransferForm.value.amount);
}

}
