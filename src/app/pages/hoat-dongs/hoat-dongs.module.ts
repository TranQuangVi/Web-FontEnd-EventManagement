import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoatDongsRoutingModule, routedComponents } from './hoat-dongs-routing.module';
import { NbCardModule,NbDialogModule, NbIconModule, NbInputModule, NbListModule ,
  NbButtonModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HoatDongComponent } from './hoat-dong/hoat-dong.component';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomBtnDetailComponent } from './hoat-dong/render.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    ...routedComponents,
    HoatDongComponent,
    CustomBtnDetailComponent,
  //  QrCodeComponent

  ],
  imports: [
    CKEditorModule,
    CommonModule,
    HoatDongsRoutingModule,
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
    FormsModule,
    ZXingScannerModule
    //QrCodeModule
  ]
})
export class HoatDongsModule { }
