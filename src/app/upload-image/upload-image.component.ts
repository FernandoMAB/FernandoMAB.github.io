import { Component, OnInit } from '@angular/core';
import { FileItem } from '../Models/file-item';
import { StorageService } from '../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Actor } from '../list-actors/list-actors.component';
import { Genre } from '../list-genre/list-genre.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  providers: [StorageService]
})
export class UploadImageComponent implements OnInit {
  submitted = false;
  loading = false;
  id: string |null;
  title = '';
  description = '';
  button = '';

  createFilm: FormGroup;
  files: FileItem[] = [];
  actorArray: Actor[] = [];
  genreArray: Genre[] = [];

  isOverDrop = false;

  constructor(private readonly storageSvc: StorageService,private fb: FormBuilder, private router:Router, 
    private aRoute: ActivatedRoute,private _movieService: MovieService) { 
      this.createFilm = this.fb.group({
        title: ['',Validators.required],
        releaseDate: ['',Validators.required],
        overView: ['',Validators.required],
        duration: ['',[Validators.required]],
        image: ['',Validators.required],
        actor: ['',Validators.required],
        genre: ['',Validators.required],
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
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

  getActors(){
    this._movieService.getActors().subscribe(data =>{
      this.actorArray = [];
      data.forEach((element:any) => {
        this.actorArray.push({
          id: element.payload.doc.id,
          firstName: element.payload.doc.data().firstName,
          lastName: element.payload.doc.data().lastName,
          gender: element.payload.doc.data().gender,
          birthday: new Date(element.payload.doc.data().birthday.seconds*1000),
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
      });
      
    });
  }

  async onUpload(){
    this.storageSvc.uploadImage(this.files);
  }

   addFilm(){
    const film: any = {
      title: this.createFilm.value.title,
      releaseDate: this.createFilm.value.releaseDate,
      overView: this.createFilm.value.overView,
      duration: this.createFilm.value.duration,
      image: this.createFilm.value.image,
      creationDate: new Date(),
      modificationDate: new Date()
    }
    this.loading = true;
    
    this._movieService.addMovie(film).then(()=>{
      //console.log('Empleado registrado!');

      this.loading = false;
      
    }).catch(error =>{
      console.error();
      this.loading = false;
    })
    const actor: any = {
      id_actor: this.createFilm.value.actorId,
      id_movie: this.id,
    }
    const genre: any = {
      id_genre: this.createFilm.value.genreId,
      id_movie: this.id,
    }
    console.log(actor)
    this._movieService.addMovActor(actor);
    this._movieService.addMovGenre(genre);
  }

  updateFilm(id:string){

  }

  addUpdateMovie(){
    this.submitted = true;
    if(this.createFilm.invalid){
      return;
    }
    if(this.id === null){
      this.addFilm();
    }else{
      this.updateFilm(this.id); 
    }
  }

  isEdit(){
    if(this.id !== null){
      this.title = 'Editar Film';
      this.description = 'Edite los campos del film';
      this.button = 'Editar';
      this.loading = true;
      
    }else{
      this.getGenres();
      this.getActors();
      this.title = 'Nuevo Film';
      this.description = 'Ingrese un nuevo film';
      this.button = 'Agregar';
    }
  }


}
