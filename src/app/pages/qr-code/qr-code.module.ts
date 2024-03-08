import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { QRCodeRoutingModule, routedComponents } from './qr-code-routing.module';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    QRCodeRoutingModule,
    ZXingScannerModule
  ]
})
export class QrCodeModule { }
