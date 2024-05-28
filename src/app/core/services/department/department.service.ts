import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Department } from '../../interfaces/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private firestore: Firestore) {}

  public getDepartments(): Observable<Department[]> {
    const departmentRef = collection(this.firestore, 'departament');
    const queryRef = query(departmentRef);
    return collectionData(queryRef) as Observable<Department[]>;
  }
}
