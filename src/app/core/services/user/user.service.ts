import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { GoogleAccountData } from '../../interfaces/google-account-data';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  public async createUser(googleAccount: GoogleAccountData) {
    const data: User = {
      email: googleAccount.email,
      name: googleAccount.name,
      phone: '',
      role: 'USER',
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
}
