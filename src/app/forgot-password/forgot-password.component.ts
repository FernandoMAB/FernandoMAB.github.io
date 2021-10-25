import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AuthService]
})
export class ForgotPasswordComponent implements OnInit {
  userMail: FormGroup;
  constructor(private fb: FormBuilder,private authSvc: AuthService, private router: Router) {
    this.userMail = this.fb.group({
      email: ['',[Validators.required,Validators.email]]
    })
   }

  ngOnInit(): void {
  }
  async onResetEmail(){
    if(this.userMail.invalid){
      return;
    }
    try {
      await this.authSvc.resetPassword(this.userMail.value.email);
      window.alert('Contraseña reseteada, revisa tu correo!')
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error);
    }
  }

}
