import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Place } from '../../interfaces/place';
@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private firestore: Firestore) {}
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