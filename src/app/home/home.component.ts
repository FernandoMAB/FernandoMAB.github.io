import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  title = 'ingweb-fm';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {//firestore: AngularFirestore
    this.items = firestore.collection('items').valueChanges();
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(){

  }
}
