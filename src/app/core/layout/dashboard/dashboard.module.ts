import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { Footer } from 'primeng/api';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FooterComponent,
    HeaderComponent,
  ]
})
export class DashboardModule { }
