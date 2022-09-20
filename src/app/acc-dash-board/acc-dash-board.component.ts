import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import { AccModel } from '../shared/acc-model';
import { AccService } from '../shared/acc.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-acc-dash-board',
  templateUrl: './acc-dash-board.component.html',
  styleUrls: ['./acc-dash-board.component.scss']
})
export class AccDashBoardComponent implements OnInit {
  fatching=true;
  error:string = '';
  errorStatus=false;

  constructor(private logingService:LoginService,private accService:AccService) { }

activeAcc:AccModel=<AccModel>{};

  ngOnInit(): void {
    this.accService.eportFatching.subscribe((data) => { 
      this.fatching = data
    });

    this.accService.exportActiveAcc.subscribe((data) => { this.activeAcc =data;
      console.log("after sub parent",this.activeAcc)
    })
 
    this.accService.exportError.subscribe((data) => {
      this.fatching=false;
      this.errorStatus = true;
      this.error = data;
    })
  }


  // onClick(){
   
  // }

}