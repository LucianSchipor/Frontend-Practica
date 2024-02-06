import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Student } from './student';
import { CompanyDto } from './company-dto';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
private apiUrl = 'https://localhost:7135/api/Account';
private static instance: AccountService;
public studentId : number = 0;
private LoggedUser: Student = {"id": 0, 
"adresaEmail" : "", 
"Company" : "", 
"Specializations": "",
"An" : "",
"Group": "",
StartDate: "",
EndDate: "",
"role": 0};


constructor(private http: HttpClient) { 
}
 
public static getInstance(http: HttpClient): AccountService {
  if (!AccountService.instance) {
    AccountService.instance = new AccountService(http);
  }
  return AccountService.instance;
}

logInUser(student: Student): void {
this.LoggedUser = student;
}

getLoggedInUser() : Student{
return this.LoggedUser;
}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/getUsers`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error("An error occurred", error);
    return new Observable<any>(); // Puteți gestiona erorile într-un mod mai robust aici
  }


  deleteAccountById(id: any){
    console.log("deleteStudent a fost apelat.");
    console.log(id);
    const url = `${this.apiUrl}/deleteUserById/${id}`
    console.log(url);
    this.http.delete<void>(url).subscribe(
      () => {
        console.log('Ștergere cu succes!');
      },
      (error) => {
        console.error('Eroare la ștergere:', error);
    })
    }
    getAccountByEmail(Email: string) : Observable<Student>{
      const url = `${this.apiUrl}/getUserByEmail/${Email}`;
      return this.http.get<Student>(`${this.apiUrl}/getUserByEmail/${Email}`)
      .pipe(
        catchError(this.handleError)
      );
    }

    updateAccount(id: any, payload: any){
      const url = `${this.apiUrl}/updateAccount/${id}`;
    console.log(url);
    console.log(payload);
      return this.http.post( 
         url,
        payload,
        {responseType: 'text'}
      ).subscribe(res => {
      })
    
    }

    private addFirmButtonClick = new Subject<number>();

    addFirmButtonClicked$ = this.addFirmButtonClick.asObservable();
  
    triggerAddFirmButtonClick(studentId: number) {
      this.addFirmButtonClick.next(studentId);
      this.studentId = studentId;
    }
  
    parseStudentResponse(response: any): Student {

      const parsedResponse = JSON.parse(response);
      return {
        id: parsedResponse.id,
        adresaEmail: parsedResponse.email || '',
        Company: parsedResponse.Company || '',
        Specializations: parsedResponse.Specializations || '',
        Group: parsedResponse.Group || '',
        StartDate: parsedResponse.StartDate || '',
        EndDate: parsedResponse.EndDate || '',
        An: parsedResponse.An || '',
        role: parsedResponse.role
      };
    }

    private updateListSubject = new Subject<void>();

    updateList$ = this.updateListSubject.asObservable();
  
    triggerUpdateList() {
      this.updateListSubject.next();
    }
  }


