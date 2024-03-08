import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },

  {
    path: 'client',
    loadChildren: () => import('./clients/clients.module')
      .then(m => m.ClientsModule),
  },


  {
    path: 'taikhoan',
    loadChildren: () => import('./account/account.module')
      .then(m => m.AccountModule),
  },
  {
    path: 'page-error',
    loadChildren: () => import('./miscellaneous/miscellaneous.module')
      .then(m => m.MiscellaneousModule),
  },
  { path: '', redirectTo: 'client', pathMatch: 'full' },
  { path: '**', component:NotFoundComponent},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
