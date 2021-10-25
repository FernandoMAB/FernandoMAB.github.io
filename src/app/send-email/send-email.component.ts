import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [AuthService]
})
export class SendEmailComponent implements OnInit {
  public user$: Observable <any> = this.authSvc.af.user;
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }
  onSendEmail(): void{
    this.authSvc.sendVerificationEmail();
  }

}
