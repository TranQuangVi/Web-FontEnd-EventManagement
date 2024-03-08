import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaiHoatDongsComponent } from './loai-hoat-dongs.component';
import { LoaiHoatDongComponent } from './loai-hoat-dong/loai-hoat-dong.component';

const routes: Routes = [{
  path: '',
  component: LoaiHoatDongsComponent,
  children: [
    {
        path: '',
        component: LoaiHoatDongComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoaiHoatDongsRoutingModule { }

export const routedComponents = [
  LoaiHoatDongsComponent,
];
