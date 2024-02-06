import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Student } from '../student';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { AccountService } from '../account.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {
  public studenti: Student[] = [];
  LoggedInUser: Student = {"id": 0, 
  "adresaEmail" : "", 
  "Company" : "", 
  "Specializations": "",
  "An" : "",
  "Group": "",
  StartDate: "",
  EndDate: "",
  "role": 0};
  displayedColumns: string[] = ['Id', 'Role', 'Email', 'Specializare', 'An', 'Grupa', 'locPractica', 'Data inceput', 'Data final', 'actions'];
  
  constructor(private http: HttpClient, private router: Router){
    this.LoggedInUser = AccountService.getInstance(http).getLoggedInUser();

    console.log(this.LoggedInUser);

if(this.LoggedInUser.role != 2){
  window.alert("Nu ai acces sa accesezi aceasta pagina.");
  router.navigate(['/login']);
}
}


  ngOnInit() {
    AccountService.getInstance(this.http).getStudents().subscribe(
      (students: Student[]) => {
          this.studenti = students;
          console.log(this.studenti);
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }


  onLogOut(){
    this.router.navigate(['/login']);
    this.LoggedInUser = {"id": 0, 
  "adresaEmail" : "", 
  "Company" : "", 
  "Specializations": "",
  "An" : "",
  "Group": "",
  StartDate: "",
  EndDate: "",
  "role": 0};
  console.log(this.LoggedInUser);
  }

  onDelete(studentId: number){
    const studentToDelete = this.studenti.find(student => student.id === studentId);
    const confirmDelete = window.confirm('Ești sigur că vrei să ștergi studentul cu email-ul ' + studentToDelete?.adresaEmail);
    if(confirmDelete){
      AccountService.getInstance(this.http).deleteAccountById(studentId);
    }
    this.router.navigate(['/admindashboard']);
  }
}
