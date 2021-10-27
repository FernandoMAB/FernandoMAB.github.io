import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private firestore: AngularFirestore) { }

  addGenre(genre: any): Promise<any>{
    return this.firestore.collection('genres').add(genre);
  }

  getGenres(): Observable <any>{
    return this.firestore.collection('genres', ref =>ref.orderBy('creationDate','asc')).snapshotChanges();
  }
  deleteGenre(id: string): Promise <any> {
    return this.firestore.collection('genres').doc(id).delete();
  }

  getGenre(id: string): Observable <any>{
    return this.firestore.collection('genres').doc(id).snapshotChanges();
  }

  updateGenre(id: string, data: any): Promise <any>{
    return this.firestore.collection('genres').doc(id).update(data);
  }
}
