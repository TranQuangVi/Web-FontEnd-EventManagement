import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TieuChisComponent } from './tieu-chis.component';
import { TieuChiComponent } from './tieu-chi/tieu-chi.component';

const routes: Routes = [{
  path: '',
  component: TieuChisComponent,
  children: [
    {
        path: '',
        component: TieuChiComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TieuChisRoutingModule { }

export const routedComponents = [
  TieuChisComponent,
];

