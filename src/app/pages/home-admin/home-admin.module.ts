
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule,NbDialogModule, NbIconModule, NbInputModule, NbListModule ,
  NbButtonModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbRouteTabsetModule,
  
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './home-admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeAdminRoutingModule, routedComponents } from './home-admin-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
    HomeAdminComponent,
    HomePageComponent,
    
  ],
  imports: [
    NbTabsetModule,
    NbRouteTabsetModule,
    HomeAdminRoutingModule,
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    ThemeModule,
    NbInputModule,
    NbListModule,
    NbButtonModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbSelectModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbIconModule,
    FormsModule
  ]
})
export class HomeAdminModule { }
