import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployee: FormGroup;
  submitted = false;
  loading = false;
  id: string |null;
  title = '';
  description = '';
  button = '';

  constructor(private fb: FormBuilder, private _employeeService: EmployeeService, private router:Router, 
              private aRoute: ActivatedRoute) { 
    this.createEmployee = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id);
  }


  ngOnInit(): void {
    this.isEdit()
  }

  addUpdateEmployee(){
    this.submitted = true;
    if(this.createEmployee.invalid){
      return;
    }
    if(this.id === null){
      this.addEmployee();
    }else{
      this.updateEmployee(this.id); 
    }
  }

  addEmployee(){
    const employee: any = {
      firstName: this.createEmployee.value.firstName,
      lastName: this.createEmployee.value.lastName,
      userName: this.createEmployee.value.userName,
      email: this.createEmployee.value.email,
      creationDate: new Date(),
      modificationDate: new Date()
    }
    this.loading = true;
    //console.log(employee)
    this._employeeService.addEmployee(employee).then(()=>{
      //console.log('Empleado registrado!');
      this.loading = false;
      this.router.navigate(['/employees']);
    }).catch(error =>{
      console.error();
      this.loading = false;
    })
  }

  updateEmployee(id: string){
    this.loading = true;
    const employee: any = {
      firstName: this.createEmployee.value.firstName,
      lastName: this.createEmployee.value.lastName,
      userName: this.createEmployee.value.userName,
      email: this.createEmployee.value.email,
      modificationDate: new Date()
    }
    this._employeeService.updateEmployee(id,employee).then(()=>{
      this.loading = false;
      //toastr this.toastr.info('Empleado modificado')
      this.router.navigate(['/employees']);
    }).catch(error =>{
      console.error();
      this.loading = false;
    });
  }


  isEdit(){
    if(this.id !== null){
      this.title = 'Editar Empleado';
      this.description = 'Edite los campos del empleado';
      this.button = 'Editar';
      this.loading = true;
      this._employeeService.getEmployee(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data.payload.data()['firstName'])
        this.createEmployee.setValue({
          firstName: data.payload.data()['firstName'],
          lastName: data.payload.data()['lastName'],
          userName: data.payload.data()['userName'],
          email: data.payload.data()['email'],
        })
      })
    }else{
      this.title = 'Nuevo Empleado';
      this.description = 'Ingrese un nuevo empleado';
      this.button = 'Agregar';
    }
  }

}
