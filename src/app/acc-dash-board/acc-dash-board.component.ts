import { Component, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-acc-dash-board',
  templateUrl: './acc-dash-board.component.html',
  styleUrls: ['./acc-dash-board.component.scss']
})
export class AccDashBoardComponent implements OnInit {

  constructor(private logingService:LoginService,private accService:AccService) { }
fathing=true;

  ngOnInit(): void {
    this.accService.eportFatching.subscribe((data) => { this.fathing = data});
  }

  // onClick(){
   
  // }

}