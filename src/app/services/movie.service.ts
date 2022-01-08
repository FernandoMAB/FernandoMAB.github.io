import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where } from "firebase/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore: AngularFirestore) { }

  addMovie(movie: any): Promise<any>{
    return this.firestore.collection('movie').add(movie);
  }
  addMovActor(movActor: any): Promise<any>{
    return this.firestore.collection('mov_actor').add(movActor);
  }
  addMovGenre(movGenre: any): Promise<any>{
    return this.firestore.collection('mov_genre').add(movGenre);
  }

  addLike(likeUser: any): Promise<any>{
    return this.firestore.collection('likes').add(likeUser);
  }

  deleteLike(id: string): Promise <any> {
    return this.firestore.collection('likes').doc(id).delete();
  }

  getMovies(): Observable <any>{
    return this.firestore.collection('movie', ref =>ref.orderBy('creationDate','asc')).snapshotChanges();
  }
  getActors(): Observable <any>{
    return this.firestore.collection('actors', ref =>ref.orderBy('creationDate','asc')).snapshotChanges();
  }
  getGenres(): Observable <any>{
    return this.firestore.collection('genres', ref =>ref.orderBy('creationDate','asc')).snapshotChanges();
  }
  getMovActor(id: string): Observable <any>{
    return this.firestore.collection('mov_actor', ref => ref.where("id_movie",'==',id)).snapshotChanges();
  }

  getMovActors(): Observable <any>{
    return this.firestore.collection('mov_actor').snapshotChanges();
  }

  getMovGenre(id: string): Observable <any>{
    return this.firestore.collection('mov_genre', ref => ref.where("id_movie",'==',id)).snapshotChanges();
  }

  getMovGenres(): Observable <any>{
    return this.firestore.collection('mov_genre').snapshotChanges();
  }

  updateMovie(id: string, data: any): Promise <any>{
    return this.firestore.collection('movie').doc(id).update(data);
  }

  getMovie(id: string): Observable <any>{
    return this.firestore.collection('movie').doc(id).snapshotChanges();
  }
  getLike(id: string): Observable <any>{
    return this.firestore.collection('likes', ref => ref.where("userId",'==',id)).snapshotChanges();
  }
  getLikes(): Observable <any>{
    return this.firestore.collection('likes').snapshotChanges();
  }
///////////////////////////////////////////////////////////////////////// 
  deleteMovies(id: string): Promise <any> {
    return this.firestore.collection('movie').doc(id).delete();
    
   // return this.firestore.collection('movie').doc(id).delete();
  }

  

  getMovieLast(): Observable <any>{
    return this.firestore.collection('movie', ref=> ref.orderBy('creationDate','desc')).snapshotChanges();
  }


}
