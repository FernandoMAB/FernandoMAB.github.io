import { Component, OnInit } from '@angular/core';
import { FileItem } from '../Models/file-item';
import { StorageService } from '../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Actor } from '../list-actors/list-actors.component';
import { Genre } from '../list-genre/list-genre.component';
import { Film } from '../home/home.component';
import { variable } from '@angular/compiler/src/output/output_ast';

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
  idMovie = '';
  title = '';
  description = '';
  button = '';

  createFilm: FormGroup;
  files: FileItem[] = [];
  actorArray: Actor[] = [];
  genreArray: Genre[] = [];
  filmArray :Film[] =[];

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
    console.log(this.createFilm.value);
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
      this.id = this.aRoute.snapshot.paramMap.get('id');
      const actor: any = {
        id_actor: this.createFilm.value.actor,
        id_movie: this.createFilm.value.title,
      }
      const genre: any = {
        id_genre: this.createFilm.value.genre,
        id_movie: this.createFilm.value.title,
      }
      console.log(actor)
      
      this._movieService.addMovActor(actor);
      this._movieService.addMovGenre(genre);
      this.router.navigate(['/movies']);
      this.loading = false;
    }).catch(error =>{
      console.error();
      this.loading = false;
    })

    //this.getFilmsID(this.createFilm.value.actor,this.createFilm.value.genre);
    console.log(this.filmArray)
  }

  getFilmsID(id_act: string,id_gen:string){
    this._movieService.getMovieLast().subscribe(data =>{
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
    
    const actor: any = {
      id_actor: this.createFilm.value.actor,
      id_movie: this.filmArray[0].title,
    }
    const genre: any = {
      id_genre: this.createFilm.value.genre,
      id_movie: this.filmArray[0].title,
    }
    console.log(actor)
    
    this._movieService.addMovActor(actor);
    this._movieService.addMovGenre(genre);
    console.log('idd: ',this.filmArray[0].id)
  }

  updateFilm(id:string){
    this.loading = true;
    const movie: any = {
      title: this.createFilm.value.title,
      releaseDate: this.createFilm.value.releaseDate,
      overView: this.createFilm.value.overView,
      duration: this.createFilm.value.duration,
      image: this.createFilm.value.image,
      modificationDate: new Date()
    }
    this._movieService.updateMovie(id,movie).then(()=>{
      this.id = this.aRoute.snapshot.paramMap.get('id');
      const actor: any = {
        id_actor: this.createFilm.value.actor,
        id_movie: this.createFilm.value.title,
      }
      const genre: any = {
        id_genre: this.createFilm.value.genre,
        id_movie: this.createFilm.value.title,
      }
      console.log(actor)
      
      this._movieService.addMovActor(actor);
      this._movieService.addMovGenre(genre);
      this.router.navigate(['/movies']);
      this.loading = false;
    }).catch(error =>{
      console.error();
      this.loading = false;
    });
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
    this.getGenres();
    this.getActors();
    
    if(this.id !== null){
      this.title = 'Editar Film';
      this.description = 'Edite los campos del film';
      this.button = 'Editar';
      this.loading = true;
      this._movieService.getMovie(this.id).subscribe(data =>{
        this.loading = false;
        this.createFilm.setValue({
          title: data.payload.data()['title'],
          releaseDate: data.payload.data()['releaseDate'],
          overView: data.payload.data()['overView'],
          duration: data.payload.data()['duration'],
          image: data.payload.data()['image'],
          genre: this.createFilm.value.genre,
          actor: this.createFilm.value.actor,
        })
      })
      
    }else{
      this.title = 'Nuevo Film';
      this.description = 'Ingrese un nuevo film';
      this.button = 'Agregar';
    }
  }


}
