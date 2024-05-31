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
} from '@angular/fire/firestore';
import { Place, PlaceList } from '../../interfaces/place';
import { Observable, from } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(
    private firestore: Firestore,
    private _toastService: ToastService
  ) {}

  public updatePlace(placeData: Place, id: string): Observable<any> {
    const data: Place = {
      name: placeData.name,
      address: placeData.address,
      map: placeData.map,
      totalFloor: placeData.totalFloor,
    };
    const userRef = doc(this.firestore, 'place', id);
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

  public createPlace(placeData: Place): Observable<any> {
    const data: Place = {
      name: placeData.name,
      address: placeData.address,
      map: placeData.map,
      totalFloor: placeData.totalFloor,
    };
    const placeRef = collection(this.firestore, 'place');

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

  public getPlaces(): Observable<Place[]> {
    const placeRef = collection(this.firestore, 'place');
    const queryRef = query(placeRef);
    return collectionData(queryRef, { idField: 'id' }) as Observable<Place[]>;
  }

  public getPlaceList(): Observable<PlaceList[]> {
    const placeRef = collection(this.firestore, 'place');
    const queryRef = query(placeRef);
    return collectionData(queryRef, { idField: 'id' }) as Observable<
      PlaceList[]
    >;
  }

  public async getPlaceById(id: string): Promise<Place | null> {
    try {
      const placeRef = doc(this.firestore, 'place', id);
      const placeSnap = await getDoc(placeRef);

      if (placeSnap.exists()) {
        return placeSnap.data() as Place;
      } else {
        console.log('No such place document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting place document:', error);
      return null;
    }
  }
}