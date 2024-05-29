import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { DepartmentDetail } from 'src/app/core/interfaces/department';
import { UserService } from 'src/app/core/services/user/user.service';
import { PlaceService } from 'src/app/core/services/place/place.service';
import { PrimeModule } from 'src/app/prime.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, PrimeModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent implements OnInit {
  public departmentDetail: DepartmentDetail = {} as DepartmentDetail;
  public isLoading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _userService: UserService,
    private _placeService: PlaceService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(async (param) => {
      await this.getDepartmentDetail(param['id']);
    });
  }
  public makeWhatsAppCall(number: string) {
    const whatsappUrl = `https://wa.me/${number}`;
    window.open(whatsappUrl, '_blank');
  }

  private async getDepartmentDetail(id: string) {
    this.isLoading = true;
    const department = await this._departmentService.getDepartmentById(id);
    if (department) {
      this.departmentDetail.department = department;
    }
    const user = await this._userService.getUserById(department?.sponsor || '');
    if (user) {
      this.departmentDetail.sponsorData = user;
    }
    const place = await this._placeService.getPlaceById(
      department?.placeId || ''
    );
    if (place) {
      this.departmentDetail.placeData = place;
    }
    console.log(this. departmentDetail);
    this.isLoading = false;
  }

}