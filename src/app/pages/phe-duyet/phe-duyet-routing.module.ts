import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CusTinyMCEComponent } from '../editors/tiny-mce/cus-tiny-mce.component';
import { PheDuyetComponent } from './phe-duyet.component';
import { ChiTietComponent } from './chi-tiet/chi-tiet.component';

const routes: Routes = [{
  path: '',
  component: PheDuyetComponent,
  children: [

    {
        path: '',
        component: PheDuyetComponent
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PheDuyetRoutingModule { }

export const routedComponents = [
  PheDuyetComponent,
  ChiTietComponent,
];
