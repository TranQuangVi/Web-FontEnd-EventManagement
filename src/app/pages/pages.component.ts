import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS, MENU_ADMIN } from './pages-menu';
import { UserService } from '../@core/mock/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    if (this.userService.getToken()) {
      console.log(this.userService.getRole())
      if (this.userService.hasAdminRole("SINHVIEN")) {
        this.router.navigate(['/pages/error']);
      }
      if (this.userService.hasAdminRole("ADMIN"))
        this.menu = MENU_ADMIN;
    }

  }

}
