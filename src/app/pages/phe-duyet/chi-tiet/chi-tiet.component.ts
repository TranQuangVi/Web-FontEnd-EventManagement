import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PhieuDuyetService } from '../../../@core/mock/phieu-duyet.service';
import { HoatDongService } from '../../../@core/mock/hoat-dong.service';
import { NbDialogService } from '@nebular/theme';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../../../@core/mock/users.service';
import { style } from '@angular/animations';

@Component({
  selector: 'ng-chi-tiet-phe-duyet',
  templateUrl: './chi-tiet.component.html',
  styleUrls: ['./chi-tiet.component.scss'],
})
export class ChiTietComponent implements OnInit {
  hoatDong: any = {}
  trangThais = ['Chờ duyệt', 'Không được duyệt', 'Đã duyệt']
  selectedItem: string

  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  constructor(private pheDuyetService: PhieuDuyetService, private hoatDongService: HoatDongService,
    private dialogService: NbDialogService, private authService: UserService) { }

  openDetail(dialog: TemplateRef<any>) {
    this.hoatDongService.getNoiDungAccepted(this.rowData.maHoatDong).then((res) => {
      this.hoatDong = res
      console.log(this.rowData)
    })
    this.selectedItem = this.rowData.trangThai
    this.dialogService.open(
      dialog,
      { context: this.hoatDong }).onClose.subscribe((event) => {
        // Hành động sau khi dialog đóng
        if (event) {
          this.save.emit(this.rowData);
        }
        console.log(event)
        console.log('Dialog closed');
      });;
  }
  role: any = []
  hasAdminRole(): boolean {
    return this.role.some(item => item.authority === 'ADMIN');
  }
  async changeLocation(trangThai: string) {
    let params = new HttpParams()
    //  params = params.set('maPhieu',  this.hoatDong.maHoatDong)

    params = params.set('trangThai', trangThai)
    await this.pheDuyetService.putTrangThai(this.rowData.maPhieu, params).then((res) => {
      console.log(res)
      // console.log( this.save)
      this.save.emit(this.rowData);

      //todo  
    })

  }
  handleImageError(event: any) {
    event.target.src = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
  }
  ngOnInit(): void {
    this.role = this.authService.getRole().role
    // console.log(this.role)
  }
  // async changeLocation(trangThai: string) {
  //   let params = new HttpParams()
  //   params = params.set('trangThai', trangThai)
  //   this.listHoatDong = this.listHoatDong.filter(hd => hd.maHoatDong !== this.hoatDong.maHoatDong)
  //   await this.hoatDongService.putTrangThai(this.hoatDong.maHoatDong, params).then((res) => {
  //     console.log(res)
  //   })
  // }
}
