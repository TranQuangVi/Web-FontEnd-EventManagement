import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HoatDongComponent} from './hoat-dong/hoat-dong.component'
import {HoatDongsComponent} from './hoat-dongs.component'
import { DanhSachComponent } from './danh-sach/danh-sach.component';
import { CusTinyMCEComponent } from '../editors/tiny-mce/cus-tiny-mce.component';
import { TaoHoatDongComponent } from './tao-hoat-dong/tao-hoat-dong.component';
import { RenderImageComponent } from './hoat-dong/render-image.component';

const routes: Routes = [{
  path: '',
  component: HoatDongsComponent,
  children: [

    {
        path: 'danhsach',
        component: HoatDongComponent
    },
    {
      path: '',
      component: DanhSachComponent
    },
    {
      path: 'themmoi',
      component: TaoHoatDongComponent
    }
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoatDongsRoutingModule { }

export const routedComponents = [
    HoatDongsComponent,
    DanhSachComponent,
    CusTinyMCEComponent,
    TaoHoatDongComponent,
    RenderImageComponent
];
