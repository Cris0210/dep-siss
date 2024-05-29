import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
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
    return collectionData(queryRef, {idField:'id'}) as Observable<Department[]>;
  }
  public async getDepartmentById(id: string): Promise<Department | null> {
    try {
      const departamentRef = doc(this.firestore, 'departament', id);
      const departmentSnap = await getDoc(departamentRef);
      if (departmentSnap.exists()) {
        return departmentSnap.data() as Department;
      } else {
        console.log('No such department document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting department document:', error);
      return null;
    }
  }
}
