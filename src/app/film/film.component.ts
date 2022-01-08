import { Component, Input, OnInit, Output, EventEmitter, DoCheck, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../list-actors/list-actors.component';
import { Genre } from '../list-genre/list-genre.component';
import { Movie } from '../Models/movie.interface';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, DoCheck, OnDestroy {
  @Input()
  movie!: Movie;
  @Output() movieClicked: EventEmitter<any> = new EventEmitter();
  userId: string;
  //public user$: Observable <any>= this.authSvc.af.user;
  constructor(private _movieService:MovieService,private authSvc: AuthService) { 
    this.authSvc.af.authState.subscribe(user =>{
      if(user) this.userId = user.uid
    }
    )
    this.userId = '';
    console.log(this.authSvc.getCurrentUser.toString())
  }

  ngOnInit(){
    console.log('3. ngOnInit');
  }

  ngDoCheck(){
    console.log('4. ngDoCheck');
  }

  ngOnDestroy(){
    console.log('4. ngOnDestroy');
  }

  like(id: string){
    const like: any = {
      userId: this.userId,
      movieId: id
    }
    this._movieService.addLike(like).catch(error =>{
      console.error();
    })
   // console.log(this.authSvc.af.currentUser);
    console.log(this.userId)
    console.log(id)
  }


}
