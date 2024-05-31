import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PrimeModule } from 'src/app/prime.module';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { PlacesComponent } from 'src/app/modules/places/places.component';
import { DepartmentsComponent } from 'src/app/modules/departments/departments.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent,
    UsersComponent,
    ProfileComponent,
    PlacesComponent,
    DepartmentsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}