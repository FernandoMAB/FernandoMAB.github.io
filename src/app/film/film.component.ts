import { Component, Input, OnInit, Output, EventEmitter, DoCheck, OnDestroy} from '@angular/core';
import { Actor } from '../list-actors/list-actors.component';
import { Genre } from '../list-genre/list-genre.component';
import { Movie } from '../Models/movie.interface';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, DoCheck, OnDestroy {
  @Input()
  movie!: Movie;
  @Output() movieClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(){
    console.log('3. ngOnInit');
  }

  ngDoCheck(){
    console.log('4. ngDoCheck');
  }

  ngOnDestroy(){
    console.log('4. ngOnDestroy');
  }


}
