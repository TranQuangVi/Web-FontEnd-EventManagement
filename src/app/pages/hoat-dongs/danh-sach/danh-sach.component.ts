import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HoatDongService } from '../../../@core/mock/hoat-dong.service';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../@core/mock/users.service';
import { Router } from '@angular/router';
import { Result, BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'ng-hoat-dong-detail',
  templateUrl: './danh-sach.component.html',
  styleUrls: ['./danh-sach.component.scss']
})

export class DanhSachComponent implements OnInit {
  allTrangThais = ['Đang triển khai', 'Chưa triển khai', 'Đã hoàn thành', 'Chưa mở']
  trangThais = ['Đang triển khai', 'Chưa triển khai', 'Đã hoàn thành']
  listHoatDong: any
  constructor(private hoatDongService: HoatDongService, private dialogService: NbDialogService,
    private userService: UserService, private router: Router, private toastrService: NbToastrService) {
    if (this.userService.hasAdminRole("SINHVIEN")) {
      this.router.navigate(['/pages/error']);
    }
  }
  async changeTrangThai(event) {
    const trangThai = event.tabTitle
    //  console.log(trangThai)
    let params = new HttpParams()
    params = params.set('trangThai', trangThai)
    await this.hoatDongService.getByTrangThai(params).then((resuft) => {
      this.listHoatDong = resuft
      // console.log(this.listHoatDong)

    })


  }
  handleImageError(event: any) {
    event.target.src = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
  }

  hoatDong: any
  async openDetail(dialog: TemplateRef<any>, maHoatDong) {
    this.hoatDong = await this.hoatDongService.getNoiDungAccepted(maHoatDong)
    this.selectedItem = this.hoatDong.trangThai
    console.log(this.hoatDong)
    this.dialogService.open(

      dialog,
      { context: this.hoatDong });
  }
  openQRCode(dialog: TemplateRef<any>, maHoatDong) {
    this.clearResult()
    this.dialogService.open(dialog, { context: maHoatDong });
  }
  openExcel(dialog: TemplateRef<any>, maHoatDong) {
    this.sourceDD = new LocalDataSource();
    this.dataSV= []
    this.dialogService.open(dialog, { context: maHoatDong });
  }
  loadSource(maHoatDong) {
    this.hoatDongService.getDSDangKy(maHoatDong).then((res) => {
      this.source.load(res)
    })
  }
  openDanhSach(dialog: TemplateRef<any>, hoatDong) {
    const maHoatDong = hoatDong.maHoatDong
    this.loadSource(maHoatDong)
    console.log(hoatDong)
    this.dialogService.open(
      dialog,
      { context: hoatDong });
  }

  async changeLocation(trangThai: string) {
    let params = new HttpParams()
    params = params.set('trangThai', trangThai)
    this.listHoatDong = this.listHoatDong.filter(hd => hd.maHoatDong !== this.hoatDong.maHoatDong)
    await this.hoatDongService.putTrangThai(this.hoatDong.maHoatDong, params).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log("error", error)

    })

  }

  selectedItem: string
  async ngOnInit() {
    try {
      await this.changeTrangThai('Đang triển khai')
    } catch (error) {
    }
  }
  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      maSo: {
        title: 'MSSV',
        type: 'string',
      },
      tenTaiKhoan: {
        title: 'Họ tên',
        type: 'number',
      },


      ngayDangKy: {
        title: 'Ngày đăng ký',
        type: 'string',
      },
      gioDiemDanh: {
        title: 'Giờ điểm danh',
        type: 'string',
      },


    },

  };
  settingsDD = {
    actions: false,
    hideSubHeader: true,
    columns: {
      maSo: {
        title: 'MSSV',
        type: 'string',
      },
      tenTaiKhoan: {
        title: 'Họ tên',
        type: 'string',
      },

    },

  };

  source: LocalDataSource = new LocalDataSource();
  sourceDD: LocalDataSource = new LocalDataSource();
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

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string, data) {
    if (resultString != this.qrResultString) {
      var params = new HttpParams()
      this.qrResultString = resultString;
      params = params.set('maSo', resultString)
      console.log(data.maHoatDong, params)
      this.hoatDongService.postDiemDanh(data.maHoatDong, params).then((res) => {
        this.showToast('success', "Xin cảm ơn!", res.tenTaiKhoan)
        this.loadSource(data)
      }).catch((error) => {
        // console.log(error)
        this.showToastFalse('danger', "Thất bại!", error.error)
        setTimeout(() => {
          this.clearResult()
        }, 2000)

      })
    }
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

   dataSV: any[] = []
  readExcelFile(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const binaryString: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

        // Lấy dữ liệu từ sheet đầu tiên (index 0)
        const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

        // Chuyển đổi dữ liệu sang mảng đối tượng
        const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        
        for (let i = 1; i < excelData.length; i++) {
          if (excelData[i][0] != '' && excelData[i][0] != null && excelData[i][1] != '' && excelData[i][1] != null) {
            const sv = {
              "maSo": excelData[i][0],
              "tenTaiKhoan": excelData[i][1]
            }
            this.dataSV.push(sv)
          }

        }
        console.log('Dữ liệu :', this.dataSV);
        console.log('Dữ liệu từ Excel:', excelData);
        this.sourceDD.load(this.dataSV)
      };

      reader.readAsBinaryString(file);
    }
  }
   async onDiemDanhExcel(data) {
    const maHoatDong=data.maHoatDong
    console.log(this.dataSV)
    var F=0
    var T=0
     for(let i =0; i<this.dataSV.length;i++){
      var params = new HttpParams()
      const maso=this.dataSV[i].maSo
      params = params.set('maSo',maso )
      console.log(params)
      await this.hoatDongService.postDiemDanh(data.maHoatDong, params).then((res) => {
        T+=1
      //  this.showToast('success', "Xin cảm ơn!", res.tenTaiKhoan+T)
        
      }).catch((error) => {
        F+=1
        // console.log(error)
     //   this.showToastFalse('danger', "Thất bại!", error.error)
        

      })
    }
    
    // this.dataSV.map((item)=>{
    //   var params = new HttpParams()
    //   params = params.set('maSo', item.maSo.toString())
    //   console.log(maHoatDong, params)
    //    this.hoatDongService.postDiemDanh(maHoatDong, params).then((res) => {
    //     T+=1
        
    //   }).catch((error) => {
    //     F+=1
  
    //   })
    // })
    const status=T+' thành công, ' + F+' thất bại.'
    this.showToast('success', "Hoàn tất!",status)
    this.loadSource(data)
    //this.loadSource(data)
  }
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
  private showToastFalse(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: false,
      duration: 5000,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}