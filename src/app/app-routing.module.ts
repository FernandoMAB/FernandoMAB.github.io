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
    path: 'upload',
    component: UploadImageComponent
  },
  {
    path: 'create-actor',
    component: CreateActorComponent
  },
  {
    path: 'actors',
    component: ListActorsComponent
  },
  {
    path: 'edit-actor/:id',
    canActivate: [AngularFireAuthGuard],
    component: CreateActorComponent,
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
