import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(){
    console.log('holaaa');
    console.log('Form -> ',this.registerForm.value);
    const {email,password} = this.registerForm.value;
    this.authSvc.registerUser(email, password);
  }
}
