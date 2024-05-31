import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Place } from 'src/app/core/interfaces/place';
import { PlaceService } from 'src/app/core/services/place/place.service';
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  public visible: boolean = false;
  public places: Place[] = [];
  public title: string = '';
  public formPlace: FormGroup;
  public submitted: boolean = false;
  private updateId: any = null;
  constructor(private _placeService: PlaceService) {
    this.formPlace = this.createFormGroup();
  }
  ngOnInit(): void {
    this.getPlaces();
  }
  public createDialog() {
    this.title = 'Registrar Edificio';
    this.updateId = null;
    this.visible = true;
  }
  public updateDialog(data: Place) {
    this.title = 'Actualizar Edificio';
    this.updateId = data.id;
    this.setFormValue(data);
    this.visible = true;
  }
  public savePlaceData() {
    this.submitted = true;
    if (this.formPlace.valid) {
      this.updateId ? this.submitUpdate(this.updateId) : this.submitCreate();
      this.submitted = false;
    }
  }
  public openMapLink(link: string) {
    window.open(link, '_blank');
  }
  private getPlaces() {
    this._placeService.getPlaces().subscribe((placesData: Place[]) => {
      this.places = placesData;
    });
  }
  private createFormGroup() {
    return new FormGroup({
      address: new FormControl('', [Validators.required]),
      map: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      totalFloor: new FormControl('', [Validators.required]),
    });
  }
  private setFormValue(data: any) {
    this.formPlace.patchValue(data);
  }
  private submitCreate() {
    this.formPlace.disable();
    const data: Place = {
      ...this.formPlace.value,
    };
    this._placeService.createPlace(data).subscribe(() => {
      this.formPlace.enable();
      this.formPlace.reset();
    });
  }
  private submitUpdate(id: string) {
    this.formPlace.disable();
    const data: Place = {
      ...this.formPlace.value,
    };
    this._placeService.updatePlace(data, id).subscribe(() => {
      this.formPlace.enable();
    });
  }
}



