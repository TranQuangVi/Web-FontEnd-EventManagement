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
  NbRadioModule,
  
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { PhanQuyenRoutingModule, routedComponents } from './phan-quyen-routing.module';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CKEditorModule,
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
    FormsModule,
    PhanQuyenRoutingModule,
    NbRadioModule,
    MatRadioModule
  ]
})
export class PheDuyetModule { }
