import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, } from '@angular/core';
import {
  NbDialogService, NbComponentStatus,
  NbToastrService, NbToastrConfig, NbGlobalPosition,
  NbGlobalPhysicalPosition, NbWindowService,
  NbThemeService, NbDialogRef
} from '@nebular/theme';
import { HoatDongService } from '../../../@core/mock/hoat-dong.service';
import { HttpParams } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'render-image',
  template: `<div style="text-align: center;"><img [src]="rowData.hinh" (error)="imgDef()" style="max-width: 90px; height: auto; max-height: 60px;" ></div>`,
})
export class RenderImageComponent {
    @Input() rowData: any;
    imgDef(){
      this.rowData.hinh="https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg"  
    }
}