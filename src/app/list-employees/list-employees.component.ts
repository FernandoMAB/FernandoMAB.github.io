import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees : any[] =[];
  employeesArray :Employee[] =[];
  public user$: Observable <any>= this.authSvc.af.user;
  constructor(private _employeeService: EmployeeService, private authSvc: AuthService,private _snackBar: MatSnackBar) { }

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
      //console.log(this.employeesArray);
    })
  }
  deleteEmployee(id: string){
    this._employeeService.deleteEmployees(id).then(()=>{
      console.log('Empleado eliminado!');
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



