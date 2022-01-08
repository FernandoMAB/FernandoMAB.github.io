import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { NgFilesDirective } from './upload-image/directives/ng-files.directive';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreateActorComponent } from './create-actor/create-actor.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListActorsComponent } from './list-actors/list-actors.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ListGenreComponent } from './list-genre/list-genre.component';
import { CreateGenreComponent } from './create-genre/create-genre.component';
import { FilmComponent } from './film/film.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { MovRecomComponent } from './mov-recom/mov-recom.component';
import { FilterComponent } from './filter/filter.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannerComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    NotAuthorizedComponent,
    SendEmailComponent,
    ForgotPasswordComponent,
    UploadImageComponent,
    NgFilesDirective,
    CreateActorComponent,
    ListActorsComponent,
    ListGenreComponent,
    CreateGenreComponent,
    FilmComponent,
    ListMoviesComponent,
    MovRecomComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: BUCKET, useValue:'gs://ingwebfm.appspot.com/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
