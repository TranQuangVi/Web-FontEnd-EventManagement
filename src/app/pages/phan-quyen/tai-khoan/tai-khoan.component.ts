import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpParams } from '@angular/common/http';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { UserService } from '../../../@core/mock/users.service';
import { error } from 'console';

@Component({
    selector: 'ng-tai-khoan',
    templateUrl: './tai-khoan.component.html',
    styleUrls: ['./tai-khoan.component.scss']
})
export class TaiKhoanComponent implements OnInit {

    constructor(private userService: UserService, private dialogService: NbDialogService,
        private toastrService: NbToastrService) { }
    settings = {
        actions: false,
        //hideSubHeader: true,
        noDataMessage: 'Danh sách trống',
        columns: {
            maSo: {
                title: 'Mã số',
                type: 'number',
            },
            hoTen: {
                title: 'Họ tên',
                type: 'string',
            },
            gioiTinh: {
                title: 'Giới tính',
                type: 'string',
            },
            ngaySinh: {
                title: 'Ngày sinh',
                type: 'string',
            },
            email: {
                title: 'Email',
                type: 'string',
            },
            sdt: {
                title: 'Số điện thoại',
                type: 'string',
            },

            xem: {
                title: '',
                type: 'custom',
                // renderComponent: ChiTietComponent,
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
    loadSource(role: string) {
        let params = new HttpParams();
        params = params.set('page', 0);
        params = params.set('size', 1000);
        this.userService.getByRoleTaiKhoan(role, params).then((res) => {
            console.log(res)
            this.source.load(res.content)
        })
    }
    chucVus = ['Sinh viên', 'Giảng viên',]

    changeTab(event) {
        console.log(event.tabTitle)
        if (event.tabTitle == "Sinh viên") {

            this.loadSource("SINHVIEN")

        }
        else {
            this.loadSource("GIANGVIEN")
        }

    }
    async open(dialog: TemplateRef<any>) {
        const phieuDuyet = {
        }
        this.dialogService.open(
            dialog,
            { context: phieuDuyet });

    }
    onSaveConfirm(data) {
        console.log(data)

        if (data.hoTen == null || data.hoTen == '') {
            this.showToastFalse("warning", "Lỗi!", "Họ tên không được để trống.")
        }

        else if (data.maSo == null || data.maSo == '')
            this.showToastFalse("warning", "Lỗi!", "Mã số không được để trống.")
        else if (data.maChucVu == null || data.maChucVu == '')
            this.showToastFalse("warning", "Lỗi!", "Chức vụ không được để trống.")

        else {
            let isValidLength = true
            if (data.sdt != '' || data.sdt != null) {


                if (isValidLength = /^[0-9]{10}$/.test(data.sdt))
                    if (data.sdt[0] != 0) {
                        isValidLength = false
                    }
            }

            isValidLength
            if (!isValidLength)
                this.showToastFalse("warning", "Lỗi!", "Số điện thoại chưa đúng.")
            else {
                data.matKhau = data.maSo
                this.userService.postTaiKhoan(data).then(() => {
                    this.showToast("success", "Thành công!", "Đã tạo tài khoản thành công.")
                    this.loadSource("SINHVIEN")
                }).catch((error) => {
                    this.showToastFalse("warning", "Lỗi!", error.error)
                    console.log(error)
                })
            }
        }


    }
    ngOnInit(): void {

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
