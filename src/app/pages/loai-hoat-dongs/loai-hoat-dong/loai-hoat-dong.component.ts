import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LoaiHoatDongService } from '../../../@core/mock/loai-hoat-dong.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-loai-hoat-dong',
  templateUrl: './loai-hoat-dong.component.html',
  styleUrls: ['./loai-hoat-dong.component.scss']
})
export class LoaiHoatDongComponent implements OnInit {


  settings = {
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
    columns: {
      maLoaiHoatDong: {
        title: 'Mã loại',
        type: 'string',
      },
      tenLoaiHoatDong: {
        title: 'Tên loại',
        type: 'string',
      },

    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: LoaiHoatDongService, private toastrService: NbToastrService, ) {
  }
  async ngOnInit() {
    try {
      let params = new HttpParams();
      params = params.set('page', 0);
      params = params.set('size', 100);

      const d = await this.service.getAll(params)
      this.source.load(d.content)
    } catch (error) {
      // Xử lý lỗi ở đây
    }
  }
  onEditConfirm(event): void {
    console.log(event.data.maLoaiHoatDong)

    const editedData = event.newData;
    console.log(editedData)
    this.service.putLoai(event.data.maLoaiHoatDong, editedData).then(() => {
      this.showToast('success', "Thành công", "Cập nhật nội dung thành công!");
      event.confirm.resolve();

    }
    ).catch((error) => {
      console.log(error)
      this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error.message);

    })
  }

  onCreateConfirm(event): void {
    const data = event.newData;
    console.log(event)
    if(data.maLoaiHoatDong ==''||data.tenLoaiHoatDong ==''){
      this.showToastFalse('warning', "Thất bại!", "Mã loại và tên loại không được để trống! ");
    }
    else{
    this.service.postLoai(data).then((res) => {
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
    const id = event.data.maLoaiHoatDong;
    if (window.confirm('Bạn thực sự muốn xóa nội dung này?')) {
      if (id != null) {
        this.service.deleteLoai(id).then(() => {
          event.confirm.resolve();
          this.showToast('success', "Thành công", " Đã xóa loại hoạt động!");
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

}
