import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.scss']
})
export class CreateGenreComponent implements OnInit {
  createGenre: FormGroup;
  submitted = false;
  loading = false;
  id: string |null;
  title = '';
  des = '';
  button = '';
  constructor(private fb: FormBuilder, private _genreService: GenreService, private router:Router, 
    private aRoute: ActivatedRoute) {
      this.createGenre = this.fb.group({
        name: ['',Validators.required],
        description: ['',Validators.required],
      });
      this.id = this.aRoute.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
    this.isEdit()
  }
  addUpdateEmployee(){
    this.submitted = true;
    if(this.createGenre.invalid){
      return;
    }
    if(this.id === null){
      this.addGenre();
    }else{
      this.updateGenre(this.id); 
    }
  }
  addGenre(){
    const genre: any = {
      name: this.createGenre.value.name,
      description: this.createGenre.value.description,
      creationDate: new Date(),
      modificationDate: new Date()
    }
    this.loading = true;
    this._genreService.addGenre(genre).then(()=>{

      this.loading = false;
      this.router.navigate(['/genres']);
    }).catch(error =>{
      console.error();
      this.loading = false;
    })
  }
  
  updateGenre(id:string){
    this.loading = true;
    const genre: any = {
      name: this.createGenre.value.name,
      description: this.createGenre.value.description,
      modificationDate: new Date()
    }
    this._genreService.updateGenre(id,genre).then(()=>{
      this.loading = false;
      //toastr this.toastr.info('Empleado modificado')
      this.router.navigate(['/genres']);
    }).catch(error =>{
      console.error();
      this.loading = false;
    });
  }

  isEdit(){
    if(this.id !== null){
      this.title = 'Editar Genero';
      this.des = 'Edite los campos del genero';
      this.button = 'Editar';
      this.loading = true;
      this._genreService.getGenre(this.id).subscribe(data =>{
        this.loading = false;
        this.createGenre.setValue({
          name: data.payload.data()['name'],
          description: data.payload.data()['description']
        })
      })
    }else{
      this.title = 'Nuevo Genero';
      this.des = 'Ingrese un nuevo genero';
      this.button = 'Agregar';
    }
  }

}
