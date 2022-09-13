import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthGaurdService } from '../shared/auth-gaurd.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  title = 'reactive-form';
  logInForm: FormGroup = <FormGroup>{};
  
  constructor(private loginSerice:LoginService,private auth:AuthGaurdService) { }

  ngOnInit(){
    this.logInForm = new FormGroup({
      'username' : new FormControl(null,Validators.required),
      'password' : new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.loginSerice.login(this.logInForm.value.username,+this.logInForm.value.password);
  }

}
