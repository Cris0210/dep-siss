import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { PrimeModule } from 'src/app/prime.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
