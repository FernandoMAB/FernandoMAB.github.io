import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email : new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async onRegister(){
    console.log('Form -> ',this.registerForm.value);
    const {email,password} = this.registerForm.value;
    const user = await this.authSvc.registerUser(email, password);
    if(user){
      this.router.navigate(['verificationEmail']);
    }
  }
}
