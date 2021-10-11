import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  public user$: Observable <any>= this.authSvc.af.user;
  constructor(private authSvc: AuthService, private router:Router) { }

  async ngOnInit() {
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

}
