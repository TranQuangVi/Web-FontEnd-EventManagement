import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ng-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {
}