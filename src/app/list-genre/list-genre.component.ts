import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-list-genre',
  templateUrl: './list-genre.component.html',
  styleUrls: ['./list-genre.component.scss']
})
export class ListGenreComponent implements OnInit {
  genreArray :Genre[] =[];
  constructor(private _genreService: GenreService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getGenres();
  }
  getGenres(){
    this._genreService.getGenres().subscribe(data =>{
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

  deleteGenre(id: string){
    this._genreService.deleteGenre(id).then(()=>{
      this._snackBar.open('Genero Eliminado!', 'Exitosamente :D', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 8*100
      });
    }).catch(error =>{
      console.log(error);
    })
  }
  displayedColumns: string[] = ['name', 'description','action'];
}
export interface Genre {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
}
