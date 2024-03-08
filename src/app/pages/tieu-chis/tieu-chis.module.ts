import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TieuChiComponent,  } from './tieu-chi/tieu-chi.component';
import { TieuChisRoutingModule, routedComponents } from './tieu-chis-routing.module';
import { TieuChisComponent } from './tieu-chis.component';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ...routedComponents,
    TieuChiComponent,
    TieuChisComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    TieuChisRoutingModule,
  ]
})
export class TieuChisModule { }
