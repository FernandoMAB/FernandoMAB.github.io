import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private firestore: AngularFirestore) { }

  addActor(actor: any): Promise<any>{
    return this.firestore.collection('actors').add(actor);
  }
  getActors(): Observable <any>{
    return this.firestore.collection('actors', ref =>ref.orderBy('creationDate','asc')).snapshotChanges();
  }
  deleteActor(id: string): Promise <any> {
    return this.firestore.collection('actors').doc(id).delete();
  }

  getActor(id: string): Observable <any>{
    return this.firestore.collection('actors').doc(id).snapshotChanges();
  }

  updateActor(id: string, data: any): Promise <any>{
    return this.firestore.collection('actors').doc(id).update(data);
  }
}
