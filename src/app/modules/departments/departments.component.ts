import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/core/interfaces/department';
import { PlaceList } from 'src/app/core/interfaces/place';
import { User } from 'src/app/core/interfaces/user';
import { AuthGoogleService } from 'src/app/core/services/auth/auth-google.service';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { PlaceService } from 'src/app/core/services/place/place.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  public visible: boolean = false;
  public departmentData: Department[] = [];
  public title: string = '';
  public formDepartment: FormGroup;
  public submitted: boolean = false;
  public list: PlaceList[] = [];
  private userData: User = {} as User;
  private updateId: any = null;

  constructor(
    private _userService: UserService,
    private _authService: AuthGoogleService,
    private _departmentService: DepartmentService,
    private _placeService: PlaceService
  ) {
    this.formDepartment = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getUserAccountData();
  }

  public createDialog() {
    this.title = 'Registrar Departamento';
    this.updateId = null;
    this.visible = true;
  }

  public updateDialog(data: Department) {
    this.title = 'Actualizar Departamento';
    this.updateId = data.id;
    this.setFormValue(data);
    this.visible = true;
  }

  public saveDepartmentData() {
    this.submitted = true;
    if (this.formDepartment.valid) {
      this.updateId ? this.submitUpdate(this.updateId) : this.submitCreate();
      this.submitted = false;
    }
  }

  private async getUserAccountData() {
    const data = await this._userService.getUserById(
      this._authService.getProfile().sub
    );
    if (data) {
      this.userData = data;
      this.getDepartmentsData(this.userData.subId || '');
      this.getPlaceList();
    }
  }

  private getPlaceList() {
    this._placeService.getPlaceList().subscribe((data: PlaceList[]) => {
      this.list = data;
    });
  }

  private getDepartmentsData(id: string) {
    this._departmentService
      .getDepartmentsBySponsorId(id)
      .subscribe((data: Department[]) => {
        this.departmentData = data;
      });
  }

  private setFormValue(data: any) {
    this.formDepartment.patchValue(data);
  }

  private submitCreate() {
    this.formDepartment.disable();
    const data: Department = {
      ...this.formDepartment.value,
      sponsor: this.userData.subId,
      placeId: this.formDepartment.value['placeId'].id,
    };
    this._departmentService.createDepartment(data).subscribe(() => {
      this.formDepartment.enable();
      this.formDepartment.reset();
    });
  }

  private submitUpdate(id: string) {
    this.formDepartment.disable();
    const data: Department = {
      ...this.formDepartment.value,
      placeId: this.formDepartment.value['placeId'].id,
    };
    this._departmentService.updateDepartment(data, id).subscribe(() => {
      this.formDepartment.enable();
    });
  }

  private createFormGroup() {
    return new FormGroup({
      description: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      roomNumber: new FormControl('', [Validators.required]),
      placeId: new FormControl('', [Validators.required]),
      rooms: new FormControl('',[Validators.required])
    });
  }
}