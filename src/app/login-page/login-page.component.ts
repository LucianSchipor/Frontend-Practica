import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountService } from '../account.service';
import { Student } from '../student';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})


export class LoginPageComponent {
  loginForm: FormGroup;
  loggedStudent: Student = {"id": 0, 
  "adresaEmail" : "", 
  "Company" : "", 
  "Specializations": "",
  "An" : "",
  "Group": "",
  StartDate: "",
  EndDate: "",
  "role": 0};

    constructor(
      private formBuilder : FormBuilder,
      private router : Router,
      private http : HttpClient,
    )
    {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
    
    
    loginUser(email: string, password: string){
    return this.http.post( 
      'https://localhost:7135/api/Account/login',
      {email, password},
      {responseType: 'text'}
    ).pipe(
      catchError(this.handleError)
    );
  }
    
    onLogin(event: Event) {
      event.preventDefault();
      if (this.loginForm.valid) {
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        if (email && password) {
          this.loginUser(email, password).subscribe((response) => {
            if (response) {
              let studentLogat = AccountService.getInstance(this.http).parseStudentResponse(response);
              AccountService.getInstance(this.http).logInUser(studentLogat);
              this.loggedStudent = studentLogat;
              if(this.loggedStudent.role == 2){
                    if(this.loggedStudent.role == 1){
                    window.alert("Welcome " + email + ", your role is Student");
                    }
                    else{
                      if(this.loggedStudent.role == 2){
                        window.alert("Welcome " + email + ", your role is Admin");
                      }
                    }
                    this.router.navigate(['/admindashboard'])
                }
                else
                if(this.loggedStudent.role == 1)
                {
                  window.alert("Welcome " + email + ", your role is " + this.loggedStudent?.role);
                  this.router.navigate(['/userdashboard'])
                }
            }
            else {
              console.log('Login failed'); // Add this line
              window.alert(
                'Login failed. Please check your username and password.'
              );
            }
          });
        }
      }
      else{
        window.alert("A aparut o eroare la citirea datelor.");
      }
    }

    private handleError(error: any): Observable<string> {
      let errorMessage = 'An error occurred while processing your request';
  
      // Poți adăuga logică suplimentară pentru a trata diferite tipuri de erori aici
      window.alert("A aparut o eroare");
      return throwError(errorMessage);
    }

    goToRegister() {
      this.router.navigate(['/register']);
    }
}