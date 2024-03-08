import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HoatDongService } from '../../../@core/mock/hoat-dong.service';
import { CustomBtnDetailComponent } from './render.component';
import { NbDialogService, NbComponentStatus, NbToastrService, NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { DanhSachComponent } from '../danh-sach/danh-sach.component';
import { RenderImageComponent } from './render-image.component';
import { UserService } from '../../../@core/mock/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-hoat-dong',
  templateUrl: './hoat-dong.component.html',
  styleUrls: ['./hoat-dong.component.scss']
})
export class HoatDongComponent implements OnInit {

  settings = {
    actions: false,
    noDataMessage:'Danh sách trống',

    //hideSubHeader: true,
    columns: {
      hinh: {
        title: 'Ảnh',
        type: 'custom',
        renderComponent: RenderImageComponent,
        // onComponentInitFunction: (instance, cell) => {
        //   //instance.rowData = cell.row.data;
        //   console.log(instance.rowData)
        //   console.log(cell)
        // }
       
      },
      maHoatDong: {
        title: 'Mã hoạt động',
        type: 'number',
      },

      tenHoatDong: {
        title: 'Tên hoạt động',
        type: 'string',
      },
      // tenLoaiHoatDong: {
      //   title: 'Loại ',
      //   type: 'string',
      // },
      // tenTieuChi: {
      //   title: 'Tiêu chí',
      //   type: 'string',
      // },
      thoiGianBatDau: {
        title: 'Thời gian bắt đầu',
        type: 'string',
      },
      trangThai: {
        title: 'Trạng thái',
        type: 'string',
      },
      xem: {
        title: '',
        type: 'custom',
        renderComponent: CustomBtnDetailComponent,
        valuePrepareFunction: (row) => {
          // Truyền các trường dữ liệu bạn muốn vào component
          return {
            row,
          };
        },
        onComponentInitFunction(instance) {
          instance.save.subscribe(()=>{
            console.log(instance)
          })
        }
      },

    },

  };

  source: LocalDataSource = new LocalDataSource();
  listHoatDong: any
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  constructor(private service: HoatDongService, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private authService: NbAuthService,  private userService:UserService, private router:Router) {
      if (this.userService.hasAdminRole("SINHVIEN")) {
        this.router.navigate(['/pages/error']);
      }
  }

  async loadData() {
    try {
      let params = new HttpParams();
      params = params.set('page', 0);
      params = params.set('size', 1000);
      const d = await this.service.getAll(params)
      this.source.load(d.content)
      this.listHoatDong = d.content
    } catch (error) {
    }
  }
  async openDetail(dialog: TemplateRef<any>, data) {
    const hoatDong = await this.service.getNoiDungAccepted(data)
    console.log(hoatDong)

    this.dialogService.open(
      dialog,
      { context: hoatDong });
  }
  async open(dialog: TemplateRef<any>) {
    const hoatDong = {
    }
    this.dialogService.open(
      dialog,
      { context: hoatDong });
  }
  moTa: string = ''
  yeuCau: string = ''
  onSaveHoatDongConfirm(data): void {
    data.moTa = this.moTa
    data.yeuCau = this.yeuCau

    this.authService.getToken().subscribe((accessToken: NbAuthJWTToken | any) => {
      data.token = accessToken.getValue()
    })
   // console.log(data)
    this.service.postHoatDong(data).then(()=>{

      this.showToast('success', "Thành công!", "Hoàn tất tạo hoạt động mới!");
      data.confirm.resolve();
    }).catch((error)=>{
      this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: "+error.error.message);
    })



  }
  async ngOnInit() {
    try {
      this.loadData()
    } catch (error) {
    }
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
