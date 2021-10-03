import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }

  addEmployee(empleado: any): Promise<any>{
    return this.firestore.collection('empleados').add(empleado);
  }

  getEmployees(): Observable <any>{
    return this.firestore.collection('empleados', ref =>ref.orderBy('creationDate','asc')).snapshotChanges();
  }
  deleteEmployees(id: string): Promise <any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }
}
