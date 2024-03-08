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
import { error } from 'console';
import { CtNoiDung, HoatDongData } from '../../../@core/data/hoat-dong';
import * as moment from 'moment';
import { CheckService } from '../../../@core/mock/check-value.service'
@Component({
  selector: 'app-custom-link-renderer',
  templateUrl: "./render.component.html",
  styleUrls: ['./render.component.scss']
})


export class CustomBtnDetailComponent {
  constructor(private dialogService: NbDialogService, private service: HoatDongService, private toastrService: NbToastrService,
    private windowService: NbWindowService, private checkService: CheckService) {

  }
  settings = {
    noDataMessage: 'Danh sách trống',

    columns: {

      tenNoiDung: {
        title: 'Tên nội dung',
        type: 'string',
      },
      thoiGianBatDau: {
        title: 'Thời gian bắt đầu',
        type: 'datetime',
      },
      thoiGianKetThuc: {
        title: 'Thời gian kết thúc',
        type: 'boolean',
      },
      noiDung: {
        title: 'Nội dung',
        type: 'string'
      },
      ghiChu: {
        title: 'Ghi chú',
        type: 'string'
      }
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',

    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };
  sourceNoidung: LocalDataSource = new LocalDataSource();
  onEditConfirm(event): void {
    var flag=true
    const editedData = event.newData;
console.log(editedData)

    if (editedData.tenNoiDung == null) {
      this.showToastFalse('warning', "Cảnh báo!", "Tên nội dung không được để trống.");
      flag=false
    }
    else if (editedData.thoiGianBatDau != ''&&editedData.thoiGianBatDau != null) {
      var check = this.checkService.checkDateTime(editedData.thoiGianBatDau)
      if (!check.status) {
        this.showToastFalse('warning', "Cảnh báo!", check.error);
        flag=false
      }
    }
    else if (editedData.thoiGianKetThuc != ''&&editedData.thoiGianKetThuc != null) {
      var check = this.checkService.checkDateTime(editedData.thoiGianKetThuc)
      if (!check.status) {
        this.showToastFalse('warning', "Cảnh báo!", check.error);
        flag=false
      }
    }
    if(flag==true) {
      this.service.putNoiDung(editedData).then((res) => {
        this.showToast('success', "Thành công", "Cập nhật nội dung thành công!");
        event.confirm.resolve();
      }).catch((error) => {
        event.confirm.reject();
        //  console.log(error.error.message)
        this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error);
      });
    }
  }

  onCreateConfirm(event): void {
    const data = event.newData;
    var flag=true
    data.maHoatDong = this.rowData.maHoatDong;
    console.log(data.maHoatDong)
    if (data.tenNoiDung == null) {
      this.showToastFalse('warning', "Cảnh báo!", "Tên nội dung không được để trống.");
      flag=false
    }
    else if (data.thoiGianBatDau != ''&&data.thoiGianBatDau != null) {
      var check = this.checkService.checkDateTime(data.thoiGianBatDau)
      if (!check.status) {
        flag=false
        this.showToastFalse('warning', "Cảnh báo!", check.error);
      }
    }
    else if (data.thoiGianKetThuc != ''&&data.thoiGianKetThuc != null) {
      var check = this.checkService.checkDateTime(data.thoiGianKetThuc)
      if (!check.status) {
        flag=false
        this.showToastFalse('warning', "Cảnh báo!", check.error);
      }
    }
    if(flag==true) {
      console.log(data)
      this.service.postNoiDung(data).then((res) => {
        //  console.log(res.message)
        event.confirm.resolve();
        this.showToast('success', "Thành công!", "Cập nhật nội dung thành công!");
      })
        .catch((error) => {
          event.confirm.reject();
          //  console.log(error.error.message)
          this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error.message);
        });
    }


  }
  handleImageError(event: any) {
    event.target.src = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
  }
  onDeleteConfirm(event): void {
    const id = event.data.maNoiDung;
    if (window.confirm('Bạn thực sự muốn xóa nội dung này?')) {
      if (id != null)
        this.service.deleteNoiDung(id)
      event.confirm.resolve();
      this.showToast('success', "Thành công", "Cập nhật nội dung thành công!");

    } else {
      event.confirm.reject();
    }
  }

  cancelConfirm(context: string): void {
    // console.log(context)
    this.service.deleteNoiDung(context)
  }
  settingsNguoi = {
    noDataMessage: 'Danh sách trống',
    columns: {
      maNoiDung: {
        title: 'Mã nội dung',
        type: 'string',
        hide: true
      },

      maTaiKhoan: {
        title: 'Mã số',
        type: 'string',
      },
      tenTaiKhoan: {
        title: 'Họ tên',
        type: 'string',
      },
      thoiLuongTrinhBay: {
        title: 'Thời lượng',
        type: 'datetime',
      },
      linkBaiTrinhBay: {
        title: 'Trình chiếu',
        type: 'boolean',
      },
      qua: {
        title: 'Quà',
        type: 'string'
      },
      ghiChu: {
        title: 'Ghi chú',
        type: 'string'
      },

    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',

    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };
  sourceNguoi: LocalDataSource = new LocalDataSource();

  onCreateCTConfirm(event, maNoiDung): void {
    let data = event.newData;
    this.service.createCtNoiDung(data, maNoiDung).then((res) => {
      event.confirm.resolve(res);
      this.showToast('success', "Thành công!", "Cập nhật nội dung thành công!");
      this.loadCtnoiDung()
    })
      .catch((error) => {
        event.confirm.reject();
        //  console.log(error.error.message)
        this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error);
      });
  }

  onEditCTConfirm(event): void {
    const editedData = event.newData;
    var key: any = {
      maNoiDung: event.data.maNoiDung,
      maSo: event.data.maTaiKhoan
    }
    this.service.putCtNoiDung(editedData, key).then((res) => {
      this.showToast('success', "Thành công", "Cập nhật nội dung thành công!");
      event.newData = res
      console.log(event.newData, res)
      event.confirm.resolve(res);
    }).catch((error) => {
      this.showToastFalse('danger', "Thất bại!", "Lỗi khi cập nhật nội dung: " + error.error);
      console.log(error)
      event.confirm.resolve(event.data);
    })
    // 
  }

  onDeleteCTConfirm(event): void {
    var key: any = {
      maNoiDung: event.data.maNoiDung,
      maSo: event.data.maTaiKhoan
    }
    console.log(key)
    if (window.confirm('Bạn thực sự muốn xóa nội dung này?')) {
      this.service.delCtNoiDung(key).then((res) => {
        this.showToast('success', "Thành công", "Đã xóa nội dung thành công!");
        event.confirm.resolve();
        console.log(event.newData, res)
      }).catch((error) => {
        this.showToastFalse('danger', "Thất bại!", "Lỗi khi xóa nội dung: " + error.error);

      })

    } else {
      event.confirm.reject();
    }


  }
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  tabList = ['Nội dung', 'Người tham gia']

  async onSaveHoatDongConfirm(data): Promise<void> {
    if (window.confirm('Xác nhận các thay đổi của hoạt động!')) {
      if (this.moTa != null)
        data.moTa = this.moTa
      if (this.yeuCau != null)
        data.yeuCau = this.yeuCau
      var flag=true
      if (data.thoiGianBatDau != null) {
        data.thoiGianBatDau=data.thoiGianBatDau.replace('T', ' ')
        console.log(data.thoiGianBatDau)
        var check = this.checkService.checkDateTime(data.thoiGianBatDau)
        if (!check.status) {
          flag=false
          this.showToastFalse('warning', "Cảnh báo!", check.error);
        }
      }
      else if (data.thoiGianKetThuc != null) {
        data.thoiGianKetThuc=data.thoiGianKetThuc.replace('T', ' ')

        var check = this.checkService.checkDateTime(data.thoiGianKetThuc)
        if (!check.status) {
          flag=false
          this.showToastFalse('warning', "Cảnh báo!", check.error);
        }
      }
      if(flag==true){
         await this.service.putHoatDong(this.rowData.maHoatDong, data);
        this.showToast('success', "Thành công!", "Cập nhật nội dung thành công!");
        this.save.emit()
        data.confirm.resolve();
      }
       
      
    } else {
      data.confirm.resolve();
    }
  }

  onDeleteHoatDongConfirm(event): void {
    if (window.confirm('Xác nhận xóa hoạt động!')) {
      this.service.deleteHoatDong(this.rowData.maHoatDong).then(() => {
        this.showToast('success', "Thành công!", "Đã xóa hoạt động!");
        event.confirm.resolve();

      }).catch((error) => {
        // console.log(error)
        this.showToastFalse('danger', "Thất bại!", error.error)
        event.confirm.reject();

      });


    } else {
    }
  }
  moTa: string = ''
  yeuCau: string = ''
  i: number = 1
  // loadCtnoiDung(maNoiDung: string): LocalDataSource {
  //   console.log(this.i += 1)
  //   return this.sourceNguoi
  // }
  changeTab() {
    this.loadCtnoiDung()
  }
  loadCtnoiDung(): void {

    this.service.getCTNoiDung(this.rowData.maHoatDong).then((res) => {
      this.sourceNguoi.load(res)
      //  src = res
      //   console.log(res)

      for (let i = 0; i < this.sourceNguoi.count(); i++) {
        var src = []
        let s: LocalDataSource = new LocalDataSource()
        //    console.log(res[i])
        for (let x of res[i].ctNoidungToChuc) {
          var item: CtNoiDung = x
          item.maNoiDung = res[i].maNoiDung
          src.push(item)
        }
        s.load(src)
        //  console.log('s', s)
        this.dataSourceArray[i] = s
      }
      //    console.log('dataSourceArray: ', this.dataSourceArray)
    })
    //   console.log(this.sourceNguoi, this.sourceNguoi.count())
    // for(let i = 0; i < this.sourceNguoi.count(); i++){
    // // this.dataSourceArray[i]=src.

    //   console.log('src: ',src[i])
    // }

    ////const index = 
    //console.log(src,src.setFilter([{ field: 'tenNoiDung', search: tenNoiDung },]));

    //console.log(index.count())
    // if (index !== -1) {
    //   // Assuming ctNoidungToChuc is an array in your data structure
    //   this.dataSourceArray[index].load(this.sourceNguoi.data[index].ctNoidungToChuc);
    // }
  }
  dataSourceArray: LocalDataSource[] = [];

  async open2(dialog: TemplateRef<any>) {
    const id = this.rowData.maHoatDong;

    const hoatDong = await this.service.getById(id)
    if (hoatDong.moTa != null)
      this.moTa = hoatDong.moTa
    if (hoatDong.yeuCau != null)
      this.yeuCau = hoatDong.yeuCau

    const noidung = await this.service.getNoiDung(id)
    //        console.log('get',noidung)
    this.sourceNoidung.load(noidung)
    await this.service.getCTNoiDung(id).then((res) => {
      this.sourceNguoi.load(res)

    })
    //this.sourceNoidung.setFilter([{ field: 'maNoiDung', search: 'MODA' },])


    //console.log(hoatDong)
    this.dialogService.open(
      dialog,
      { context: hoatDong });

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

  openWindowWithoutBackdrop() {
    this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Window without backdrop',
        hasBackdrop: false,
        closeOnEsc: false,
      },
    );
  }

  async ngOnInit() {
    try {
    } catch (error) {
    }
  }

}
