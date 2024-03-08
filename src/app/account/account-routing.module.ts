import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account.component';
import { HoatDongComponent } from './hoat-dong/hoat-dong.component';

const routes: Routes = [{
  path: '',
  component: AccountComponent,
  children: [

    {
        path: '',
        component: ProfileComponent,
    },
    {
        path: 'hoatdong',
        component: HoatDongComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
export const routedComponents = [
  ProfileComponent,
  AccountComponent,
  HoatDongComponent,
];