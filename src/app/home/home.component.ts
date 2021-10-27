import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filmArray :Film[] =[];
  title = 'ingweb-fm';
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore,private _movieService:MovieService) {//firestore: AngularFirestore
    this.items = firestore.collection('items').valueChanges();
  }


  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(){
    this._movieService.getMovies().subscribe(data =>{
      this.filmArray = [];
      data.forEach((element:any) => {
        this.filmArray.push({
          id: element.payload.doc.id,
          title: element.payload.doc.data().title,
          image: element.payload.doc.data().image,
          duration: element.payload.doc.data().duration,
          overView: element.payload.doc.data().overView,
          releaseDate: new Date(element.payload.doc.data().releaseDate.seconds*1000),
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
      });
      console.log(this.filmArray);
    })
  }

  clickMovie(id:string){

  }
}

export interface Film {
  id: string;
  title: string;
  image: string;
  duration: string;
  overView: string;
  releaseDate: Date;
  creationDate: Date;
  modificationDate: Date;
}