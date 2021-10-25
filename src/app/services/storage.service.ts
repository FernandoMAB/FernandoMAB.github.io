import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../Models/file-item';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private MEDIA_STORAGE_PATH = 'filmsImages';
  constructor(private readonly storage:AngularFireStorage) {

   }
   uploadImage(images:FileItem[]){
     for(const item of images){
      item.uploading = true;
      const filePath = this.generateFileName(item.name);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file); //Subir la imagen con el archivo y ruta
      task.snapshotChanges().pipe(
        finalize(()=>{
          item.downloadURL = fileRef.getDownloadURL();
          item.uploading = false;
        })
      ).subscribe()
     }
   }

   private generateFileName(name:string):string{
     return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`;
   }
}
