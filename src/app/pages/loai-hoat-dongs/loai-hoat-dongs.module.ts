import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{LoaiHoatDongsRoutingModule, routedComponents} from './loai-hoat-dongs-routing.module'
import { LoaiHoatDongsComponent } from './loai-hoat-dongs.component';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LoaiHoatDongComponent } from './loai-hoat-dong/loai-hoat-dong.component';

@NgModule({
  declarations: [
    ...routedComponents,
    LoaiHoatDongsComponent,
    LoaiHoatDongComponent,
  ],
  imports: [
    CommonModule,
    LoaiHoatDongsRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class LoaiHoatDongsModule { }
