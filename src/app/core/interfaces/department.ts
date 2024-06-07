import { Place } from './place';
import { User } from './user';

export interface Department {
  id: string;
  description: string;
  floor: number;
  placeId: string;
  roomNumber: number;
  sponsor: string;
  price: number;
  photo: string;
  rooms: string;
}

export interface DepartmentDetail {
  department: Department;
  sponsorData: User;
  placeData: Place;
}