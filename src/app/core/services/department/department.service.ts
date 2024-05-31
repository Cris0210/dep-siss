import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Department } from '../../interfaces/department';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(
    private firestore: Firestore,
    private _toastService: ToastService
  ) {}

  public getDepartments(): Observable<Department[]> {
    const departmentRef = collection(this.firestore, 'departament');
    const queryRef = query(departmentRef);
    return collectionData(queryRef, { idField: 'id' }) as Observable<
      Department[]
    >;
  }

  public getDepartmentsBySponsorId(id: string): Observable<Department[]> {
    const departamentRef = collection(this.firestore, 'departament');
    const queryRef = query(departamentRef, where('sponsor', '==', id));
    return collectionData(queryRef, { idField: 'id' }) as Observable<
      Department[]
    >;
  }

  public updateDepartment(
    departamentData: Department,
    id: string
  ): Observable<any> {
    const data: Department = departamentData;
    const userRef = doc(this.firestore, 'departament', id);
    return from(
      getDoc(userRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          this._toastService.messageNotification(
            'success',
            'Actualizado con exito.'
          );
          return setDoc(userRef, data, { merge: true });
        }
        this._toastService.messageNotification(
          'error',
          'Error en la operación.'
        );
        return null;
      })
    );
  }

  public createDepartment(departamentData: Department): Observable<any> {
    const data: Department = departamentData;
    const placeRef = collection(this.firestore, 'departament');

    return from(
      addDoc(placeRef, data)
        .then(() => {
          this._toastService.messageNotification(
            'success',
            'Creado con éxito.'
          );
          return data;
        })
        .catch((error) => {
          this._toastService.messageNotification(
            'error',
            'Error en la operación.'
          );
          throw error;
        })
    );
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