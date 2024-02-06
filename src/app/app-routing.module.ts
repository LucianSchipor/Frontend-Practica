import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { FormWorkComponent } from './form-work/form-work.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to `login-component`
  { path: 'login', component: LoginPageComponent },
  {path: 'admindashboard', component: AdmindashboardComponent},
  {path: 'userdashboard', component: UserdashboardComponent},
  {path: 'formwork', component:FormWorkComponent}
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }