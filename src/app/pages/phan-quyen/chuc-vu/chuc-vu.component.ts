import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpParams } from '@angular/common/http';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ChucVuService } from '../../../@core/mock/chuc-vu.service';

@Component({
  selector: 'ng-chuc-vu',
  templateUrl: './chuc-vu.component.html',
  styleUrls: ['./chuc-vu.component.scss']
})
export class ChucVuComponent implements OnInit {
  constructor(private chucVuService: ChucVuService, private toastrService: NbToastrService) { }
  settings = {
    //hideSubHeader: true,
    actions:{
      columnTitle: '',
      position: 'right'
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
    noDataMessage: 'Danh sách trống',
    columns: {
      maChucVu: {
        title: 'Mã chức vụ',
        type: 'number',
      },
      tenChucVu: {
        title: 'Tên chức vụ',
        type: 'string',
      }
    },

  };
  source: LocalDataSource = new LocalDataSource();
  async loadSource() {
    let params = new HttpParams();
    params = params.set('page', 0);
    params = params.set('size', 1000);
    this.chucVuService.getChucVu(params).then((res) => {
      console.log(res)
      this.source.load(res)
    })
   
  }
  onEditConfirm(event): void {
    console.log(event.data.maChucVu)

    const editedData = event.newData;
    console.log(editedData)
    if(editedData.maChucVu ==''||editedData.tenChucVu ==''){
      this.showToastFalse('warning', "Thất bại!", "Mã và tên tiêu chí không được để trống! ");
    }
    else if(editedData.maChucVu !=event.data.maChucVu){
      this.showToastFalse('warning', "Thất bại!", "Không thể thay đổi mã này! ");
    }
    else{
    this.chucVuService.putChucVu(event.data.maChucVu, editedData).then(() => {
      this.showToast('success', "Thành công", "Cập nhật nội dung thành công!");
      event.confirm.resolve();

    }
    ).catch((error) => {
      console.log(error)
      this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error.message);

    })
  }
}

  onCreateConfirm(event): void {
    const data = event.newData;
    if(data.maChucVu ==''||data.tenChucVu ==''){
      this.showToastFalse('warning', "Thất bại!", "Mã và tên tiêu chí không được để trống! ");
    }
    else{
    this.chucVuService.postChucVu(data).then((res) => {
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

  onDeleteConfirm(event): void {
    const id = event.data.maChucVu;
    if (window.confirm('Bạn thực sự muốn xóa nội dung này?')) {
      if (id != null) {
        this.chucVuService.deleteChucVu(id).then(() => {
          event.confirm.resolve();
          this.showToast('success', "Thành công", " Đã xóa tiêu chí!");
        }).catch((error) => {
          event.confirm.reject();
          //  console.log(error.error.message)
          this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error.message);
        });
      }
    } else {
      event.confirm.reject();
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
   ngOnInit() {
    this.loadSource()
  }
}