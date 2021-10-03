import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private af: AngularFireAuth
  ) { }

    createUser(email: string, password: string){
      return this.af.signInWithEmailAndPassword(email,password);
    }

}
