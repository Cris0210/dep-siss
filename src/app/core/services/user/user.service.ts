import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { GoogleAccountData } from '../../interfaces/google-account-data';
import { User } from '../../interfaces/user';
import { Observable, from } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: Firestore,
    private _toastService: ToastService
  ) {}

  public async createUser(googleAccount: GoogleAccountData) {
    const data: User = {
      email: googleAccount.email,
      name: googleAccount.name,
      phone: '',
      role: 'CLIENTE',
      subId: googleAccount.sub,
      photoURL: googleAccount.picture,
    };
    const userRef = doc(this.firestore, 'users', googleAccount.sub);
    if (!(await getDoc(userRef)).exists()) {
      setDoc(userRef, data);
    }
  }

  public async getUserById(id: string): Promise<User | null> {
    try {
      const userRef = doc(this.firestore, 'users', id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data() as User;
      } else {
        console.log('No such user document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      return null;
    }
  }

  public updateUser(userData: User, id: string): Observable<any> {
    const data: User = {
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
    };
    const userRef = doc(this.firestore, 'users', id);
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

  public updateUserRole(role: string, id: string): Observable<any> {
    const data = { role: role }; // Solo actualiza el rol
    const userRef = doc(this.firestore, 'users', id);

    return from(
      getDoc(userRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          return setDoc(userRef, data, { merge: true }).then(() => {
            this._toastService.messageNotification(
              'success',
              'Role actualizado con éxito.'
            );
          });
        } else {
          this._toastService.messageNotification(
            'error',
            'Error en la operación. El usuario no existe.'
          );
          return null;
        }
      })
    );
  }

  public getAllUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    const queryRef = query(userRef);
    return collectionData(queryRef) as Observable<User[]>;
  }
}