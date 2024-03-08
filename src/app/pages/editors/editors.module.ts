import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';
import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
    FormsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class EditorsModule { }
