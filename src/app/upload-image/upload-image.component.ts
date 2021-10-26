import { Component, OnInit } from '@angular/core';
import { FileItem } from '../Models/file-item';
import { StorageService } from '../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  providers: [StorageService]
})
export class UploadImageComponent implements OnInit {
  createFilm: FormGroup;
  files: FileItem[] = [];
  isOverDrop = false;
  urrl: string = '';
  constructor(private readonly storageSvc: StorageService,private fb: FormBuilder, private router:Router, 
    private aRoute: ActivatedRoute) { 
      this.createFilm = this.fb.group({
        title: ['',Validators.required],
        //releaseDate: ['',Validators.required],
        //overView: ['',Validators.required],
        //duration: ['',Validators.required],
        image: ['',Validators.required]
      })
  }

  ngOnInit(): void {
  }

  async onUpload(){
    this.storageSvc.uploadImage(this.files);
  }

  async addFilm(){
    const employee: any = {
      title: this.createFilm.value.title,
      image: this.createFilm.value.image,
    }
    console.log(employee);
    await console.log(this.files[0].downloadURL);
  }


}
