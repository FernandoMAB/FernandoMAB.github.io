import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private _employeeService: EmployeeService, private router:Router) { 
    this.createEmployee = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]]
    })
  }

  ngOnInit(): void {
  }
  addEmployee(){
    this.submitted = true;
    if(this.createEmployee.invalid){
      return;
    }
    const employee: any = {
      firstName: this.createEmployee.value.firstName,
      lastName: this.createEmployee.value.lastName,
      userName: this.createEmployee.value.userName,
      email: this.createEmployee.value.email,
      creationDate: new Date(),
      modificationDate: new Date()
    }
    this.loading = true;
    console.log(employee)
    this._employeeService.addEmployee(employee).then(()=>{
      console.log('Empleado registrado!');
      this.loading = false;
      this.router.navigate(['/employees']);
    }).catch(error =>{
      console.error();
      this.loading = false;
    })
  }
}
