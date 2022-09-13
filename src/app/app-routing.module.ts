import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccDashBoardComponent } from './acc-dash-board/acc-dash-board.component';
import { StatmentsComponent } from './acc-dash-board/statments/statments.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGaurdService } from './shared/auth-gaurd.service';

const routes: Routes = [
  {
    path:'acc-dash-board',
    canActivate: [AuthGaurdService],
    component:AccDashBoardComponent

  },
  {
    path:'login-page',
    component:LoginPageComponent
  },
  {
    path:'statments',
    component:StatmentsComponent
  },
  {
    path:'header',
    component:HeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
