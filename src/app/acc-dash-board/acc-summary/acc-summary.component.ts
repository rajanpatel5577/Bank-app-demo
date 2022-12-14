import { Component, OnInit } from '@angular/core';

import { AccModel } from 'src/app/shared/acc-model';
import { AccService } from 'src/app/shared/acc.service';


@Component({
  selector: 'app-acc-summary',
  templateUrl: './acc-summary.component.html',
  styleUrls: ['./acc-summary.component.scss']
})
export class AccSummaryComponent implements OnInit {

  activeAcc:AccModel=<AccModel>{};
  constructor(private accService:AccService) { }

  ngOnInit(){
 this.accService.exportActiveAcc.subscribe((data) =>{
  this.activeAcc = data})
  }

}
