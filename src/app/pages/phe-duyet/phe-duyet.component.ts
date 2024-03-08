import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ChiTietComponent } from './chi-tiet/chi-tiet.component';
import { PhieuDuyetService } from '../../@core/mock/phieu-duyet.service';
import { HttpParams } from '@angular/common/http';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { UserService } from '../../@core/mock/users.service';

@Component({
  selector: 'ng-phe-duyet',
  templateUrl: './phe-duyet.component.html',
  styleUrls: ['./phe-duyet.component.scss']
})
export class PheDuyetComponent implements OnInit {

  settings = {
    actions: false,
    noDataMessage: 'Danh sách trống',
    columns: {
      maPhieu: {
        title: 'Mã phiếu',
        type: 'number',
      },
      tenPhieu: {
        title: 'Tên phiếu',
        type: 'string',
      },
      maHoatDong: {
        title: 'Mã hoạt động ',
        type: 'string',
      },
      tenTaiKhoan: {
        title: 'Người tạo',
        type: 'string',
      },
      ngayGui: {
        title: 'Ngày gửi',
        type: 'string',
      },
      ghiChu: {
        title: 'Ghi chú',
        type: 'string'
      },
      trangThai: {
        title: 'Trạng thái',
        type: 'string',
      },
      xem: {
        title: '',
        type: 'custom',
        renderComponent: ChiTietComponent,
        valuePrepareFunction: (row) => {
          return {
            row,
          };
        },
        onComponentInitFunction(instance) {
          instance.save.subscribe()
          //  instance.changeLocation.subscribe()
        },
      },

    },

  };

  source: LocalDataSource = new LocalDataSource();
  onTrangThaiChanged(newTrangThai: string) {
    // Update data in the ng2-smart-table source or trigger a refresh
    // Example: Reload the data
    console.log(newTrangThai)
    // this.loadSource();
  }
  loadSource() {
    let params = new HttpParams()
    this.pheDuyetService.getAll(params).then((res) => {
      // console.log(res)
      this.source.load(res)
    }).catch((error) => {
      console.log(error)

    })
  }
  async open(dialog: TemplateRef<any>) {
    const phieuDuyet = {
    }
    this.dialogService.open(
      dialog,
      { context: phieuDuyet });

  }
  onSaveConfirm(data) {
    const ngayGui = data.ngayGui.replace('T', ' ');
    data.ngayGui = ngayGui
    this.pheDuyetService.postPhieu(data).then(() => {
      this.showToast('success', "Thành công!", "Hoàn tất tạo hoạt động mới!");
    }).catch((error) => {
      console.log(error)
      this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error.message);
    })

    console.log(data)
  }
  constructor(private pheDuyetService: PhieuDuyetService, private dialogService: NbDialogService,
    private toastrService: NbToastrService, private userService: UserService) { }
  ngOnInit(): void {
    this.loadSource()
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
  hasAdminRole(): boolean {
    return this.userService.hasAdminRole("GIANGVIEN");
  }
}
