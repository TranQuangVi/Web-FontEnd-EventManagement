
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAlertModule, NbCardModule,NbButtonModule,
  NbIconModule,
  NbMenuModule,
  NbPopoverModule,
  NbSearchModule,
  NbUserModule,
  NbSelectModule,
  
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { ClientsRoutingModule, } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { HoatDongComponent } from './hoat-dong/hoat-dong.component';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ECommerceModule } from '../pages/e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbThemeService ,} from '@nebular/theme';
import { SearchComponent } from './search/search.component';
import { ClientMenu } from './client-menu';

@NgModule({
  declarations: [
    ClientsComponent,
    HoatDongComponent,
    SearchComponent,
    
  ],
  imports: [
    NbSelectModule,
    ClientsRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    CommonModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    NbButtonModule,
    NbUserModule,
  ]
})
export class ClientsModule { }
