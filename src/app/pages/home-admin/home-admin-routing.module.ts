import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './home-admin.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [{
  path: '',
  component: HomeAdminComponent,
  children: [

    {
        path: '',
        component: HomePageComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdminRoutingModule { }

export const routedComponents = [
    HomeAdminComponent,
];
