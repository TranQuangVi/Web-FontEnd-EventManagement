import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HoatDongService } from '../../../@core/mock/hoat-dong.service';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
    selector: 'ng-them-hoat-dong',
    templateUrl: './tao-hoat-dong.component.html',
    styleUrls: ['./tao-hoat-dong.component.scss']
})

export class TaoHoatDongComponent implements OnInit {
    data: any = {}
    constructor(private hoatDongService: HoatDongService, private dialogService: NbDialogService,
        private toastrService: NbToastrService) {

    }
    moTa: string = ''
    yeuCau: string = ''
    onSaveHoatDongConfirm(data): void {
        data.moTa = this.moTa
        data.yeuCau = this.yeuCau
        data.thoiGianBatDau = data.thoiGianBatDau.replace('T', ' ');
        data.thoiGianKetThuc = data.thoiGianKetThuc.replace('T', ' ');
        //console.log(data)
        this.hoatDongService.postHoatDong(data).then(() => {
            this.showToast('success', "Thành công!", "Hoàn tất tạo hoạt động mới!");
        }).catch((error) => {
            this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error.message);
        })
    }
    handleImageError(event: any) {
        event.target.src = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
    }


    async ngOnInit() {
        try {
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