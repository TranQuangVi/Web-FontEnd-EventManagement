import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NbAuthService, NbLoginComponent, NbLogoutComponent, NbTokenLocalStorage } from '@nebular/auth';

@Component({
    selector: 'ng-logout',
    template: ``,
})
export class LogoutComponent {
    constructor(private storage: NbTokenLocalStorage, private router: Router) {
        this.storage.clear()
        this.router.navigate(['/auth/login']);
    }


}