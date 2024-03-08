import { Component } from '@angular/core';
import { ACCOUNT_MENU } from './account-menu';

@Component({
  selector: 'ng-account',
  styleUrls: ['./account.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AccountComponent {
  menu = ACCOUNT_MENU;
}