import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Movie } from '../Models/movie.interface';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  moviesArray :Movie[] =[];
  public user$: Observable <any>= this.authSvc.af.user;
  constructor(private authSvc: AuthService,private _snackBar: MatSnackBar,private _movieService:MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(){
    this._movieService.getMovies().subscribe(data =>{
      this.moviesArray = [];
      data.forEach((element:any) => {
        this.moviesArray.push({
          id: element.payload.doc.id,
          title: element.payload.doc.data().title,
          releaseDate: element.payload.doc.data().releaseDate,
          overView: element.payload.doc.data().overView,
          duration: element.payload.doc.data().duration,
          image: element.payload.doc.data().image,
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
      });
    })
  }

  deleteMovies(id: string){
    this._movieService.deleteMovies(id).then(()=>{
      console.log('Pelicula eliminado!');
      this._snackBar.open('Pelicula Eliminada!', 'Exitosamente :D', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 8*100
      });
    }).catch(error =>{
      console.log(error);
    })
  }

  displayedColumns: string[] = ['title', 'releaseDate', 'overView', 'duration','image'];

}
