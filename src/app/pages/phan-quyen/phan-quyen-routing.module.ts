import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CusTinyMCEComponent } from '../editors/tiny-mce/cus-tiny-mce.component';
import { PhanQuyenComponent } from './phan-quyen.component';
import { TaiKhoanComponent } from './tai-khoan/tai-khoan.component';
import { ChucVuComponent } from './chuc-vu/chuc-vu.component';


const routes: Routes = [{
  path: '',
  component: PhanQuyenComponent,
  children: [

    {
        path: 'phanquyen',
        component: ChucVuComponent
    }, 
    {
        path: '',
        component: TaiKhoanComponent
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhanQuyenRoutingModule { }

export const routedComponents = [
    PhanQuyenComponent,
    TaiKhoanComponent,
    ChucVuComponent
];
