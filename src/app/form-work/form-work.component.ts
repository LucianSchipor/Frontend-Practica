import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AccountService } from '../account.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CompanyDto } from '../company-dto';
import { UserdashboardComponent } from '../userdashboard/userdashboard.component';
import { SharedDataService } from '../shared-data.service';
import { Student } from '../student';

@Component({
  selector: 'app-form-work',
  templateUrl: './form-work.component.html',
  styleUrl: './form-work.component.scss',
  providers: [provideNativeDateAdapter()] 
})
export class FormWorkComponent implements OnInit {
  form!: FormGroup;
  studentId!: number;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router, private sharedDataService: SharedDataService) {

    this.studentId = AccountService.getInstance(http).studentId;

    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.studentId = +params['id'] || 0;
    });
    AccountService.getInstance(this.http).addFirmButtonClicked$.subscribe((idStudent) => {
      this.studentId = idStudent;
    });
    
    this.studentId = AccountService.getInstance(this.http).studentId;

    this.form = this.fb.group({
      nume: ['', Validators.required],
      dataInceput: [null, Validators.required],
      dataSfarsit: [null, Validators.required],
    });
  }

  onSave(): void {
      const nume = this.form.value.nume;
      const dataInceput = this.range.value.start;
      const dataSfarsit = this.range.value.end;
      console.log("Nume: ", nume);
      const payload = {
        CompanyName: nume, // Obține aceste valori din câmpurile formularului
        StartDate: dataInceput, // Obține aceste valori din câmpurile formularului
        EndDate: dataSfarsit, // Obține aceste valori din câmpurile formularului
      };

      
      console.log(this.studentId);
    AccountService.getInstance(this.http).updateAccount(this.studentId, payload);
    let newList: Student[] = [];
    AccountService.getInstance(this.http).getStudents().subscribe((students) => {
      newList = students;
    })
    this.sharedDataService.updateDataList(newList);
    this.router.navigate(['/userdashboard']);
  }

  public triggerUpdateListFromOtherComponent() {
    AccountService.getInstance(this.http).triggerUpdateList();
  }
  onCancel(){
    this.router.navigate(['/userdashboard']);
  }
}