import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private dataListSubject = new BehaviorSubject<Student[]>([]);
  dataList$ = this.dataListSubject.asObservable();

  updateDataList(newList: Student[]): void {
    this.dataListSubject.next(newList);
  }
  constructor() { }
}
