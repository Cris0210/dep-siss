import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrimeModule } from 'src/app/prime.module';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeModule,
    NgImageSliderModule
  ]
})
export class HomeModule { }
