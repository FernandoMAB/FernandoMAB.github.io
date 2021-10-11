import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public af: AngularFireAuth
  ) { }

    async logInUser(email: string, password: string){
      try{
        const result = await this.af.signInWithEmailAndPassword(email,password);
        return result;
      }catch (error){
        console.log(error);
        return null;
      }
    }
    async registerUser(email: string, password: string){
      try{
        const result = await this.af.createUserWithEmailAndPassword(email, password);
        return result;
        } catch(error){
        console.log(error);
        return null;
        }
    }
    async logout(){
      try{
        await this.af.signOut();
      }catch(error){
        console.log(error);
      }
    }
    getCurrentUser(){
      return this.af.authState.pipe(first()).toPromise();
    }

}
