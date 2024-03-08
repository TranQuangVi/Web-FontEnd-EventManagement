import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'hoatdongs',
      loadChildren: () => import('./hoat-dongs/hoat-dongs.module')
        .then(m => m.HoatDongsModule),
    },
    {
      path: 'qrcode',
      loadChildren: () => import('./qr-code/qr-code.module')
        .then(m => m.QrCodeModule),
    },
    {
      path: 'pheduyet',
      loadChildren: () => import('./phe-duyet/phe-duyet.module')
        .then(m => m.PheDuyetModule),
    },
    {

      path: 'homeadmin',
      loadChildren: () => import('./home-admin/home-admin.module')
        .then(m => m.HomeAdminModule),
    },
    {
      path: 'loaihoatdongs',
      loadChildren: () => import('./loai-hoat-dongs/loai-hoat-dongs.module')
        .then(m => m.LoaiHoatDongsModule),
    },
    {
      path: 'tieuchis',
      loadChildren: () => import('./tieu-chis/tieu-chis.module')
        .then(m => m.TieuChisModule),
    },
    {
      path:'thongke',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path:'taikhoan',
      loadChildren: () => import('./phan-quyen/phan-quyen.module')
        .then(m => m.PheDuyetModule),
    },
    
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],

},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
