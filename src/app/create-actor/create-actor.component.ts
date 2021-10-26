import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../services/actor.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit {
  createActor: FormGroup;
  submitted = false;
  loading = false;
  id: string |null;
  title = '';
  description = '';
  button = '';
  constructor(private fb: FormBuilder, private router:Router, 
    private aRoute: ActivatedRoute, private _actorService: ActorService) {
      this.createActor = this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        gender: ['',Validators.required],
        birthday: ['',[Validators.required]]
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id);
     }

  ngOnInit(): void {
    this.isEdit()
  }
  addUpdateActor(){
    this.submitted = true;
    if(this.createActor.invalid){
      return;
    }
    if(this.id === null){
      this.addActor();
    }else{
      this.updateActor(this.id); 
    }
  }

  addActor(){
    const actor: any = {
      firstName: this.createActor.value.firstName,
      lastName: this.createActor.value.lastName,
      gender: this.createActor.value.gender,
      birthday: this.createActor.value.birthday,
      creationDate: new Date(),
      modificationDate: new Date()
    }
    this.loading = true;
    console.log(actor)
    this._actorService.addActor(actor).then(()=>{
      console.log('Actor registrado!');
      this.loading = false;
      this.router.navigate(['/actors']); //cambiar 
    }).catch(error =>{
      console.error();
      this.loading = false;
    })
  }
  updateActor(id: string){
    this.loading = true;
    const employee: any = {
      firstName: this.createActor.value.firstName,
      lastName: this.createActor.value.lastName,
      gender: this.createActor.value.gender,
      birthday: this.createActor.value.birthday,
      modificationDate: new Date()
    }
    this._actorService.updateActor(id,employee).then(()=>{
      this.loading = false;
      //toastr this.toastr.info('Empleado modificado')
      this.router.navigate(['/actors']);
    }).catch(error =>{
      console.error();
      this.loading = false;
    });
  }

  isEdit(){
    if(this.id !== null){
      this.title = 'Editar Actor';
      this.description = 'Edite los campos del actor';
      this.button = 'Editar';
      this.loading = true;
      this._actorService.getActor(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data.payload.data()['firstName'])
        this.createActor.setValue({
          firstName: data.payload.data()['firstName'],
          lastName: data.payload.data()['lastName'],
          gender: data.payload.data()['gender'],
          birthday: data.payload.data()['birthday'],
        })
      })
    }else{
      this.title = 'Nuevo Actor';
      this.description = 'Ingrese un nuevo actor';
      this.button = 'Agregar';
    }
  }

}
