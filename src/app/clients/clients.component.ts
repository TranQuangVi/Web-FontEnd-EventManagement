import { Component, OnInit } from '@angular/core';
import { ClientMenu } from './client-menu';
import { UserService } from '../@core/mock/users.service';
import { NbMenuItem } from '@nebular/theme';
import { TieuChiService } from '../@core/mock/tieu-chi.service';
import { HttpParams } from '@angular/common/http';
import { LoaiHoatDongService } from '../@core/mock/loai-hoat-dong.service';

@Component({
  selector: 'ng-clients',
  styleUrls: ['./clients.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class ClientsComponent implements OnInit {

  constructor(private tieuChiService: TieuChiService, private loaiHoatDongService:LoaiHoatDongService) {
    // Các thao tác khởi tạo bạn muốn thực hiện

    //for(let i ;i<d)
  }
  dataTieuChi: []
  dataLoai: []
  menu:NbMenuItem[]
  async ngOnInit() {
    
    await this.getTieuChi()
    await this.getLoai()
    
    this.menu=this.CLIENT_MENU()
  }
  async getTieuChi() {
    let params = new HttpParams();
    params = params.set('page', 0);
    params = params.set('size', 10);
    const d = await this.tieuChiService.getData(params)
    this.dataTieuChi  = d.content.map((item) => {
      return {
        title: item.tenTieuChi,
        link: '/client/hoatdong/search',
        queryParams: { key: 'tieuchi', value: item.maTieuChi },
      };
    });
    
    console.log(this.dataTieuChi)
  };
  async getLoai() {
    let params = new HttpParams();
      params = params.set('page', 0);
      params = params.set('size', 100);

      const d = await this.loaiHoatDongService.getAll(params)
    this.dataLoai  = d.content.map((item) => {
      return {
        title: item.tenLoaiHoatDong,
        link: '/client/hoatdong/search',
        queryParams: { key: 'loai', value: item.maLoaiHoatDong },
      };
    });
    
    console.log(this.dataTieuChi)
  };
  CLIENT_MENU(): NbMenuItem[] {
    return [
      {
        title: 'Trang chủ',
        link: '/client/hoatdong',
        icon: 'home-outline',
      },
      {
        title: 'Tiêu chí',        
        icon: 'map-outline',

        children: this.dataTieuChi
        //    this.getAllTieuChi()

      },
      {
        title: 'Loại hoạt động',
        icon: 'pantone-outline',
        children: this.dataLoai
      },
      {
        title: 'Sắp xếp',
        icon: 'options-outline',
        children: [
          {
            title: 'Mới nhất',
            icon: 'lock-outline',
            link: '/',
          },
          {
            title: 'Cũ nhất',
            icon: 'lock-outline',
            link: '/',
          },]
      }
    ]
  }
}
