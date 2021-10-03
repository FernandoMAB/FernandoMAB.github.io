import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees : any[] =[];
  employeesArray :Employee[] =[];

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this._employeeService.getEmployees().subscribe(data =>{
      this.employees = [];
      this.employeesArray = [];
      data.forEach((element:any) => {
        //console.log(element.payload.doc.id);//Obtener el ID
        //console.log(element.payload.doc.data())//Obtenemos toda la informacion
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        this.employeesArray.push({
          id: element.payload.doc.id,
          firstName: element.payload.doc.data().firstName,
          lastName: element.payload.doc.data().lastName,
          userName: element.payload.doc.data().userName,
          email: element.payload.doc.data().email,
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
      });
      console.log(this.employeesArray);
    })
  }
  deleteEmployee(id: string){
    this._employeeService.deleteEmployees(id).then(()=>{
      console.log('Empleado eliminado!')
    }).catch(error =>{
      console.log(error);
    })
  }
  
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'email','action'];
  //dataSource = new MatTableDataSource(this.employeesArray);
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  creationDate: Date;
  modificationDate: Date;
}


