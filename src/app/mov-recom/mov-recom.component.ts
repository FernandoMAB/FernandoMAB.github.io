import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Film } from '../home/home.component';
import { Actor } from '../list-actors/list-actors.component';
import { Genre } from '../list-genre/list-genre.component';
import { Movie } from '../Models/movie.interface';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-mov-recom',
  templateUrl: './mov-recom.component.html',
  styleUrls: ['./mov-recom.component.scss']
})
export class MovRecomComponent implements OnChanges {
  filmArray :Film[] =[];
  likesArray :Likes[] =[];
  Movies :Movie[] = [];
  RecomendationM :Movie[] = [];
  MoviesLiked :Movie[] = [];
  MoviesLikedUser :Movie[] = [];
  GenreLiked :MovGenre[] = [];
  GenreLikedUser :MovGenre[] = [];
  GenreTMP :MovGenre[] = [];
  ActorTMP : MovActor[] = [];
  ActorLiked : MovActor[] = [];
  ActorLikedUser : MovActor[] = [];

  RActor: RecomenAct[] = [];
  RGenre: RecomenGen[] = [];
  
  RecomenMovie: RecomenMovie[] = [];
  
  userId: string;

  pointsGenre: number = 10;
  pointsActor: number = 7;
  
  constructor(private _movieService:MovieService,private authSvc: AuthService) {
    this.authSvc.af.authState.subscribe(user =>{
      if(user) this.userId = user.uid
      this.getLikedMovies();
      
    }
    )
    this.userId = '';
   }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.getAllData();
    this.magicDotCom();
  }

  ngOnInit(): void {
    
  }
  ngDoCheck():void{
    //this.getAllData();
    //this.magicDotCom();

  }

  onRecom(){
    var c=0;
    while(c<3){
      this.getAllData();
      this.magicDotCom();
      c++;
    }

  }


  clickMovie(id:string){

  }

  async getLikedMovies(){
    ///Obtengo los likes
    await this._movieService.getLike(this.userId).subscribe(data =>{
      this.likesArray = [];
      data.forEach((element: any) => {
        this.likesArray.push({
          id: element.payload.doc.id,
          movieId: element.payload.doc.data().movieId,
          userId: element.payload.doc.data().userId
        }) 
        console.log('logg',this.likesArray[this.likesArray.length-1].movieId);
               
      });
      //this.getData();
    })
    
  }
    getData(){
    console.log('hola')
    console.log(this.likesArray,'lalalal')
    for (let index = 0; index < this.likesArray.length; index++) {
      console.log(this.likesArray[0].movieId,'lalalalikes')
        this._movieService.getMovie(this.likesArray[index].movieId).subscribe(data =>{
          this.MoviesLiked = [];
          data.forEach((element:any) => {
            this.MoviesLiked.push({
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
          console.log(this.MoviesLiked);
          console.log(this.likesArray,'lalalal')
        })
        this._movieService.getMovActor(this.MoviesLiked[0].title).subscribe(data =>{
          this.ActorLiked = [];
          data.forEach((element:any) => {
            this.ActorLiked.push({
              id: element.payload.doc.id,
              id_actor: element.payload.doc.data().id_actor,
              id_movie: element.payload.doc.data().id_movie
            })
          });
        })
        this._movieService.getMovGenre(this.MoviesLiked[0].title).subscribe(data =>{
          this.GenreLiked = [];
          data.forEach((element:any) => {
            this.GenreLiked.push({
              id: element.payload.doc.id,
              id_genre: element.payload.doc.data().id_genre,
              id_movie: element.payload.doc.data().id_movie
            })
          });
        })
        //fin de Obtener datos
        console.log(this.MoviesLiked);
        console.log(this.ActorLiked);
        console.log(this.GenreLiked);
      }
  }

  getAllData(){
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
      console.log(this.MoviesLiked);
      console.log(this.likesArray,'lalalal')
    })

    this._movieService.getMovActors().subscribe(data =>{
      this.ActorLiked = [];
      data.forEach((element:any) => {
        this.ActorLiked.push({
          id: element.payload.doc.id,
          id_actor: element.payload.doc.data().id_actor,
          id_movie: element.payload.doc.data().id_movie
        })
      });
    })
    this._movieService.getMovGenres().subscribe(data =>{
      this.GenreLiked = [];
      data.forEach((element:any) => {
        this.GenreLiked.push({
          id: element.payload.doc.id,
          id_genre: element.payload.doc.data().id_genre,
          id_movie: element.payload.doc.data().id_movie
        })
      });
    })
    //fin de Obtener datos
    //console.log(this.MoviesLiked);
    //console.log(this.ActorLiked);
    //console.log(this.GenreLiked);
  }

  magicDotCom(){
    //console.log("metodosss")
    this.MoviesLikedUser = [];
    this.GenreLikedUser = [];
    this.ActorLikedUser = [];
    this.RecomenMovie = [];
    this.RecomendationM = [];
    this.RActor = [];
    this.RGenre = [];
    for (let index = 0; index < this.likesArray.length; index++) {
      for (let j = 0; j < this.Movies.length; j++) {
        if(this.likesArray[index].movieId === this.Movies[j].id){
          this.MoviesLikedUser.push(this.Movies[j])
        }
      }
      //console.log("magiccssc", this.MoviesLikedUser)
    }
    for (let index = 0; index < this.MoviesLikedUser.length; index++) {
      for (let j = 0; j < this.GenreLiked.length; j++) {
        if(this.MoviesLikedUser[index].title === this.GenreLiked[j].id_movie){
          this.GenreLikedUser.push(this.GenreLiked[j]);
        }
      }
      for (let j = 0; j < this.ActorLiked.length; j++) {
        if(this.MoviesLikedUser[index].title === this.ActorLiked[j].id_movie){
          this.ActorLikedUser.push(this.ActorLiked[j]);
        }
      }
    }
    //console.log(this.GenreLikedUser,'GENRE')
    //console.log(this.ActorLikedUser,'ACTOR')
    //console.log(this.ActorLiked,'ActorLiked')
    for (let index = 0; index < this.ActorLikedUser.length; index++) {
      let newActor = {
        id_actor: this.ActorLikedUser[index].id_actor,
        points: 0
      }
      for (let j = 0; j < this.MoviesLikedUser.length; j++) {
        if(this.ActorLiked[index].id_movie == this.MoviesLikedUser[j].title){
            newActor.points = newActor.points + this.pointsActor;
            
        }
      }
      if(newActor.points>0){
        this.RActor.push(newActor)
      }
    }

    //GenreLIKE
    for (let index = 0; index < this.GenreLikedUser.length; index++) {
      let newGenre = {
        id_genre: this.GenreLikedUser[index].id_genre,
        points: 0
      }
      for (let j = 0; j < this.MoviesLikedUser.length; j++) {

        if(this.GenreLikedUser[index].id_movie === this.MoviesLikedUser[j].title){ 
            newGenre.points = newGenre.points + this.pointsGenre;
            this.RGenre.push(newGenre)
        }
      }
      var bol = true;
      this.RGenre.forEach(element => {
        if(newGenre.id_genre == element.id_genre){
          bol = false;
        }
      });
      if(bol != true){
        this.RGenre.push(newGenre)
      }
    }
    //console.log("No ordenado");
    //console.log(this.RActor);
    //console.log(this.RGenre);
    //SORT Actors
    //console.log("Ordenamiento");
    this.RActor.sort(function (a, b){
      if (a.points > b.points) {
        return 1;
      }
      if (a.points < b.points) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    //SORT Genres
    this.RGenre.sort(function (a, b){
      if (a.points > b.points) {
        return 1;
      }
      if (a.points < b.points) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    
    this.RActor = this.RActor.filter((value, index, array) => 
     !array.filter((v, i) => value == v && i < index).length);

    this.RGenre = this.RGenre.filter((value, index, array) => 
     !array.filter((v, i) => value == v && i < index).length);
     
    console.log(this.RActor);
    console.log(this.RGenre);

    this.Movies.forEach(element => {
      var pointMovie = 0;
      console.log(element);
      this.ActorTMP = [];
      this.ActorLiked.forEach(elementAL => {
        if(elementAL.id_movie == element.title){
          this.ActorTMP.push(elementAL);
        }
        
      });
      console.log("elementAL",this.ActorTMP)


      /*this._movieService.getMovActor(element.title).subscribe(data =>{
        this.ActorTMP = [];
        data.forEach((elementac:any) => {
          this.ActorTMP.push({
            id: elementac.payload.doc.id,
            id_actor: elementac.payload.doc.data().id_actor,
            id_movie: elementac.payload.doc.data().id_movie
          })
        });
      })*/
      console.log("MovActor",this.ActorTMP);
      //Comparar con los arrays con puntuacion
      this.ActorTMP.forEach(elementTMP => {
        if(this.ActorTMP != null){
          this.RActor.forEach(elementRA => {
            if(elementRA.id_actor == elementTMP.id_actor){
              pointMovie = pointMovie + elementRA.points
              console.log()
            }
          });
        }
      });
      //Obtener Genero de firebase de la pelicula seleccionada
      this.GenreTMP = [];
      this.GenreLiked.forEach(elementGL => {
        if(elementGL.id_movie == element.title){
          this.GenreTMP.push(elementGL);
        }
        
      });
      console.log("elementGL",this.GenreTMP)
/*
      this._movieService.getMovGenre(element.title).subscribe(data =>{
        this.GenreTMP = [] = this.GenreLiked;
        data.forEach((elementf:any) => {
          this.GenreTMP.push({
            id: elementf.payload.doc.id,
            id_genre: elementf.payload.doc.data().id_genre,
            id_movie: elementf.payload.doc.data().id_movie
          })
        });
      })*/
      //Comparar con los arrays con puntuacion
      console.log(this.RGenre,"genero")
      console.log(this.GenreTMP)
      for (let index = 0; index < this.GenreTMP.length; index++) {
        for (let j = 0; j < this.RGenre.length; j++) {
          //if(this.ActorTMP != null){
            //this.RGenre.forEach(elementRG => {
              if(this.GenreTMP[index].id_genre == this.RGenre[j].id_genre){
                console.log(this.GenreTMP[index],"testtttt")
                pointMovie = pointMovie + this.RGenre[j].points
                console.log(this.RGenre[j])
                
              }
              //console.log("Genre: ",newMovieR.points,this.RGenre[j].id_genre,this.GenreTMP[index].id_genre)
            //});
          //}
          
        }
        
      }
      if(pointMovie >= 10){
        //console.log(pointMovie,"newMovieR");
        let newMovieR = {
          movie: element.title,
          points:  pointMovie
        }
        //console.log(newMovieR.movie, "MOVIE");
        this.RecomenMovie.push(newMovieR);
      }
    });

    //SORT RecomenMovie
    console.log("Movies");
    console.log(this.RecomenMovie);
    this.RecomenMovie.sort(function (a, b){
      if (a.points > b.points) {
        return 1;
      }
      if (a.points < b.points) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    //seleccionar movies
    this.Movies.forEach(elementmov => {
      this.RecomenMovie.forEach(recom => {
        if(elementmov.title == recom.movie){
          this.RecomendationM.push(elementmov);
        }
      });
    });

  }

}

export interface Likes{
  id:string;
  movieId:string;
  userId:string;
}
export interface MovActor{
  id:string;
  id_actor:string;
  id_movie:string;
}
export interface MovGenre{
  id:string;
  id_genre:string;
  id_movie:string;
}
export interface RecomenGen{
  id_genre:string;
  points:number;
}
export interface RecomenAct{
  id_actor:string;
  points:number;
}
export interface RecomenMovie{
  movie:string;
  points:number;
}
