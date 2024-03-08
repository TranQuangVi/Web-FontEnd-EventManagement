import { Component, OnInit } from '@angular/core';
import { Result,BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qr-code',
  templateUrl:'./qr-code.component.html'
  
  
})
export class QrCodeComponent implements OnInit {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  constructor() {}

  ngOnInit(): void {}
  clearResult(): void {
    this.qrResultString = null;
  }
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(resultString)
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }
  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }
  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = Boolean(devices && devices.length);
  }
  onScanSuccess(result: Result): void {
    console.log('Scanned successfully:', result.getText());
    // Xử lý dữ liệu quét ở đây
  }
}
