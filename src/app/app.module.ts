import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { StatmentsComponent } from './acc-dash-board/statments/statments.component';
import { AccService } from './shared/acc.service';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './acc-dash-board/intro/intro.component';
import { SideMenubarComponent } from './acc-dash-board/side-menubar/side-menubar.component';
import { AccSummaryComponent } from './acc-dash-board/acc-summary/acc-summary.component';
import { LoginService } from './shared/login.service';
import { FundTransferComponent } from './acc-dash-board/fund-transfer/fund-transfer.component';
import { LoanComponent } from './acc-dash-board/loan/loan.component';
import {AccDashBoardComponent} from './acc-dash-board/acc-dash-board.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGaurdService } from './shared/auth-gaurd.service';
import { NewAccAddComponent } from './new-acc-add/new-acc-add.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    StatmentsComponent,
    HeaderComponent,
    IntroComponent,
    SideMenubarComponent,
    AccSummaryComponent,
    FundTransferComponent,
    LoanComponent,
    AccDashBoardComponent,
    NewAccAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [AccService,LoginService,AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
