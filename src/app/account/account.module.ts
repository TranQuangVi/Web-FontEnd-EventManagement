
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAlertModule, NbCardModule, NbButtonModule,
  NbIconModule,
  NbMenuModule,
  NbPopoverModule,
  NbSearchModule,
  NbUserModule,
  NbRadioModule,
  NbTabsetModule,
  NbSelectModule,

} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ECommerceModule } from '../pages/e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbThemeService, } from '@nebular/theme';
import { AccountRoutingModule, routedComponents } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    ...routedComponents,

  ],
  imports: [
    AccountRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    CommonModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    NbButtonModule,
    NbUserModule,
    FormsModule,
    NbRadioModule,
    MatRadioModule,
    NbSelectModule,
    NbTabsetModule,
    Ng2SmartTableModule
  ]
})
export class AccountModule { }
