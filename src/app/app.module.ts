import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { FormGroup, FormControl } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { MatList, MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { FormWorkComponent } from './form-work/form-work.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AccountService } from './account.service';


export let AppInjector: Injector;

registerLocaleData(en);

@NgModule({
  declarations: [
  AppComponent,
  LoginPageComponent,
  AdmindashboardComponent,
  UserdashboardComponent,
  FormWorkComponent
],

  imports: [
    BrowserModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
