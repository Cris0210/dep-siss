import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/modules/home/home.module').then((m)=>m.HomeModule)
      },
      {
        path: 'login',
        loadChildren: () =>
          import('src/app/modules/login/login.module').then(
            (m) => m.LoginModule
          ),
      },

      {
        path: 'details/:id',
        loadChildren: () =>
          import('src/app/modules/details/details.module').then(
            (m) => m.DetailsModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
