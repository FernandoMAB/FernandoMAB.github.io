import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { HomeComponent } from './home/home.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CreateActorComponent } from './create-actor/create-actor.component';
import { ListActorsComponent } from './list-actors/list-actors.component';
import { CreateGenreComponent } from './create-genre/create-genre.component';
import { ListGenreComponent } from './list-genre/list-genre.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { MovRecomComponent } from './mov-recom/mov-recom.component';
import { FilterComponent } from './filter/filter.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'employees',
    canActivate: [AngularFireAuthGuard],
    component: ListEmployeesComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'create-employee',
    canActivate: [AngularFireAuthGuard],
    component: CreateEmployeeComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'edit-employee/:id',
    canActivate: [AngularFireAuthGuard],
    component: CreateEmployeeComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInTo }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verificationEmail',
    component: SendEmailComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'movies',
    component: ListMoviesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'create-movie',
    component: UploadImageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'edit-movie/:id',
    component: UploadImageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'create-actor',
    component: CreateActorComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'actors',
    component: ListActorsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'edit-actor/:id',
    canActivate: [AngularFireAuthGuard],
    component: CreateActorComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'create-genre',
    component: CreateGenreComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'genres',
    component: ListGenreComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'edit-genre/:id',
    canActivate: [AngularFireAuthGuard],
    component: CreateGenreComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'suggestions',
    canActivate: [AngularFireAuthGuard],
    component: MovRecomComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'filter',
    canActivate: [AngularFireAuthGuard],
    component: FilterComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
