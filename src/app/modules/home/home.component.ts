import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/prime.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { Department } from 'src/app/core/interfaces/department';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PrimeModule, NgImageSliderModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  public isLoading: boolean = true;

  public carouselImg: any = [
    {
      image: 'assets/carousel/img1.jpg',
      thumbImage: 'assets/carousel/img1.jpg',
    },
    {
      image: 'assets/carousel/img2.jpg',
      thumbImage: 'assets/carousel/img2.jpg',
    },
    {
      image: 'assets/carousel/img3.jpg',
      thumbImage: 'assets/carousel/img3.jpg',
    },
    {
      image: 'assets/carousel/img4.jpg',
      thumbImage: 'assets/carousel/img4.jpg',
    },
  ];

  public departments: Department[] = [];

  constructor(private _departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartmentData();
  }

  private loadDepartmentData() {
    this.isLoading = true;
    this._departmentService
      .getDepartments()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
        this.isLoading = false;
      });
  }
}