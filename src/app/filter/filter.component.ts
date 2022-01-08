import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../list-genre/list-genre.component';
import { Movie } from '../Models/movie.interface';
import { MovGenre } from '../mov-recom/mov-recom.component';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filter: FormGroup;
  genreArray: Genre[] = [];
  MovieFilter :Movie[] = [];
  Movies :Movie[] = [];
  Genres :MovGenre[] = [];

  submitted = false;

  constructor(private _movieService: MovieService,private fb: FormBuilder) { 
    this.filter = this.fb.group({
      StartDate: ['',Validators.required],
      EndDate: ['',Validators.required],
      genre: ['',Validators.required],
    })
  }
  getGenres(){
    this._movieService.getGenres().subscribe(data =>{
      this.genreArray = [];
      data.forEach((element:any) => {this.genreArray.push({
        id: element.payload.doc.id,
        name: element.payload.doc.data().name,
        description: element.payload.doc.data().description,
        creationDate: element.payload.doc.data().creationDate,
        modificationDate: element.payload.doc.data().modificationDate
      })
    });
  })
  }

  clickMovie(id:string){

  }

  ngOnInit(): void {
    this.getGenres();
  }
  doFilter(){
    this.MovieFilter = [];
    this.submitted = true;
    if(this.filter.invalid){
      return;
    }
    console.log(this.filter)
    // OBTENER MOVIES

    this._movieService.getMovies().subscribe(data =>{
      this.Movies = [];
      data.forEach((element:any) => {
        this.Movies.push({
          id: element.payload.doc.id,
          title: element.payload.doc.data().title,
          releaseDate: new Date(element.payload.doc.data().releaseDate.seconds*1000),
          overView: element.payload.doc.data().overView,
          duration: element.payload.doc.data().duration,
          image: element.payload.doc.data().image,
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
      });
    })
    //this.MovieFilter = this.Movies;
    //OBTENGO EL TODOS LOS GENEROS DE LAS PELICULAS
    this._movieService.getMovGenres().subscribe(data =>{
      this.Genres = [];
      data.forEach((element:any) => {
        this.Genres.push({
          id: element.payload.doc.id,
          id_genre: element.payload.doc.data().id_genre,
          id_movie: element.payload.doc.data().id_movie
        })
      });
    })

    this.Movies.forEach(element => {
      this.Genres.forEach(elementG => {
        if(element.releaseDate>=this.filter.value.StartDate && element.releaseDate<=this.filter.value.EndDate && elementG.id_genre== this.filter.value.genre && elementG.id_movie == element.title ){
          console.log("Movie",element.title);
          console.log("Genero",elementG.id_genre);
          var valid = false;
          this.MovieFilter.forEach(elementM => {
            if(elementM.id == element.id){
              valid = true;
            }
          });
          if(valid == false){
            this.MovieFilter.push(element)
          }
        }
      });
      
    });

  }
}
