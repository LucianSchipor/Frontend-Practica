import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { AccountService } from '../account.service';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent implements OnInit{
  public studenti: Student[] = [];
  displayedColumns: string[] = ['id', 'adresaEmail', 'Specializare', 'An', 'Grupa', 'locPractica', 'Data inceput', 'Data final', 'actions'];
  LoggedInUser: Student;

  constructor(private router: Router, private http: HttpClient, private sharedDataService: SharedDataService) {
    
  

    this.LoggedInUser = AccountService.getInstance(http).getLoggedInUser();
    console.log(this.LoggedInUser, "este logat in momentul acesta");
    if(this.LoggedInUser.role == 0){
      window.alert("Nu ai acces la aceasta pagina. Mai intai conecteaza-te");
      this.router.navigate(['/login']);
    }

    
    AccountService.getInstance(this.http).getStudents().subscribe(
      (students: Student[]) => {
        console.log("STudents:", students);
          this.studenti = students.filter(student => student.id == this.LoggedInUser.id);
          console.log(this.studenti);
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
    console.log(this.LoggedInUser);
  
    AccountService.getInstance(http).updateList$.subscribe(() => {
      this.updateList();
    });
  }

  ngOnInit(): void {
    AccountService.getInstance(this.http).getStudents().subscribe(
      (students: Student[]) => {
        console.log("STudents:", students);
          this.studenti = students.filter(student => student.id == this.LoggedInUser.id);
          console.log(this.studenti);
      },
      (error) => {
        console.error('Error fetching students', error);
      })

      AccountService.getInstance(this.http).updateList$.subscribe(() => {
        this.updateList();
      });
      
      this.sharedDataService.dataList$.subscribe((newlist) => {
        this.studenti = newlist;  
      });
    }


  editStudent(student: Student) {
    const id = student.id;
    AccountService.getInstance(this.http).triggerAddFirmButtonClick(id);
    this.router.navigate(['/formwork']);
  }

  public updateList() {
    AccountService.getInstance(this.http).getStudents().subscribe(
      (students: Student[]) => {
        this.studenti = students.filter(student => student.id == this.LoggedInUser.id);
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }
}
