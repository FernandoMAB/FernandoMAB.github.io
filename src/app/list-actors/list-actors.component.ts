import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActorService } from '../services/actor.service';

@Component({
  selector: 'app-list-actors',
  templateUrl: './list-actors.component.html',
  styleUrls: ['./list-actors.component.scss']
})
export class ListActorsComponent implements OnInit {
  ActorsArray :Actor[] =[];
  constructor(private _actorService: ActorService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getActors();
  }
  getActors(){
    this._actorService.getActors().subscribe(data =>{
      this.ActorsArray = [];
      data.forEach((element:any) => {
        this.ActorsArray.push({
          id: element.payload.doc.id,
          firstName: element.payload.doc.data().firstName,
          lastName: element.payload.doc.data().lastName,
          gender: element.payload.doc.data().gender,
          birthday: new Date(element.payload.doc.data().birthday.seconds*1000),
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
      });
      console.log(this.ActorsArray);
    })
  }
  deleteActor(id: string){
    this._actorService.deleteActor(id).then(()=>{
      this._snackBar.open('Actor Eliminado!', 'Exitosamente :D', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 8*100
      });
      
    }).catch(error =>{
      console.log(error);
    })
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'email','action'];
  
}
export interface Actor {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  creationDate: Date;
  modificationDate: Date;
}
