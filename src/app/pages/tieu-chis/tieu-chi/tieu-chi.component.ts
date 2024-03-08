import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TieuChiService } from '../../../@core/mock/tieu-chi.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { error } from 'console';

@Component({
  selector: 'ngx-tieu-chi',
  templateUrl: './tieu-chi.component.html',
  styleUrls: ['./tieu-chi.component.scss']
})
export class TieuChiComponent implements OnInit {
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
      maTieuChi: {
        title: 'Mã tiêu chí',
        type: 'string',
      },
      tenTieuChi: {
        title: 'Tên tiêu chí',
        type: 'string',
      },

    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: TieuChiService, private toastrService: NbToastrService,) {
  }

  onEditConfirm(event): void {
    console.log(event.data.maTieuChi)

    const editedData = event.newData;
    console.log(editedData)
    if(editedData.maTieuChi ==''||editedData.tenTieuChi ==''){
      this.showToastFalse('warning', "Thất bại!", "Mã và tên tiêu chí không được để trống! ");
    }
    else{
    this.service.putTieuChi(event.data.maTieuChi, editedData).then(() => {
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
    if(data.maTieuChi ==''||data.tenTieuChi ==''){
      this.showToastFalse('warning', "Thất bại!", "Mã và tên tiêu chí không được để trống! ");
    }
    else{
    this.service.postTieuChi(data).then((res) => {
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
    const id = event.data.maTieuChi;
    if (window.confirm('Bạn thực sự muốn xóa nội dung này?')) {
      if (id != null) {
        this.service.deleteTieuChi(id).then(() => {
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
  async ngOnInit() {
    try {
      let params = new HttpParams();
      params = params.set('page', 0);
      params = params.set('size', 10);

      const d = await this.service.getData(params)
      this.source.load(d.content)
    } catch (error) {
      // Xử lý lỗi ở đây
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
