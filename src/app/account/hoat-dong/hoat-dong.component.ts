import { Component, OnInit } from "@angular/core";
import { NbButtonModule, NbComponentSize, NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { HoatDongService } from "../../@core/mock/hoat-dong.service";
import { HttpParams } from "@angular/common/http";
import { constants } from "buffer";
import { LocalDataSource } from "ng2-smart-table";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { RenderImageComponent } from "../../pages/hoat-dongs/hoat-dong/render-image.component";
import { UserService } from "../../@core/mock/users.service";
import { Router } from "@angular/router";

@Component({
    selector: 'ng-hoatdong-client',
    templateUrl: "./hoat-dong.component.html",
    styleUrls: ['./hoat-dong.component.scss']
})

export class HoatDongComponent implements OnInit {

    ngOnInit(): void {
        this.loadDataDk()
        this.loadDataThamGia()
    }

    settings = {
        actions: false,
        hideSubHeader: true,
        columns: {
            hinh: {
                title: 'Ảnh',
                type: 'custom',
                renderComponent: RenderImageComponent,
            },
            maHoatDong: {
                title: 'Mã hoạt động',
                type: 'number',
            },

            tenHoatDong: {
                title: 'Tên hoạt động',
                type: 'string',
            },
            thoiGianBatDau: {
                title: 'Thời gian bắt đầu',
                type: 'string',
            },

        }

    }

    source: LocalDataSource = new LocalDataSource();
    listHoatDong: any
    constructor(private service: HoatDongService, private toastrService: NbToastrService,
        private dialogService: NbDialogService, private authService: NbAuthService, private userService: UserService, private router: Router) {

    }
    async loadDataDk() {
        try {

            const d = await this.service.getHoatDongDK()
            console.log(d)
            this.source.load(d)
            this.listHoatDong = d
        } catch (error) {
        }
    }
    listHoatDongThamGia:any
    async loadDataThamGia() {
        try {

            const d = await this.service.getHoatDongThamGia()
            console.log(d)
            this.listHoatDongThamGia = d
        } catch (error) {
        }
    }
    changeTab(event) {
        const tab = event.tabTitle
        if(tab=="Đã tham gia"){
            
        }
        else{
            this.loadDataDk()
        }
    }
    handleImageError(event: any) {
        event.target.src = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
      }
}