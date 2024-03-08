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
  
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { PheDuyetComponent } from './phe-duyet.component';
import { PheDuyetRoutingModule, routedComponents } from './phe-duyet-routing.module';

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
    PheDuyetRoutingModule,
  ]
})
export class PheDuyetModule { }
