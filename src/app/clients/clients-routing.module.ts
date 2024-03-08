import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { HoatDongComponent } from './hoat-dong/hoat-dong.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [{
  path: '',
  component: ClientsComponent,
  children: [

    {
      path: 'hoatdong',
      component: HoatDongComponent,
    },
    {
      path: '',
      redirectTo: 'hoatdong',
      pathMatch: 'full',
    },
    {
      path: 'hoatdong/search',
      component: SearchComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }
