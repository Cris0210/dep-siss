import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { PrimeModule } from 'src/app/prime.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PrimeModule, NgImageSliderModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent {
  carouselImg: any = [
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

}
