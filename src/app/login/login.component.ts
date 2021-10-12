import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  errorLogged = false;
  loginForm = new FormGroup({
    email : new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log('submit')
  }
  async  onLogin(){
    const {email,password} = this.loginForm.value;
    try {
      const user = await this.authSvc.logInUser(email,password);
      if(user){
        this.router.navigate(['/home']);
      }else{
        this.errorLogged = true;
      }
    } catch (error) {
      console.log(error);
    }
    
  }
}
