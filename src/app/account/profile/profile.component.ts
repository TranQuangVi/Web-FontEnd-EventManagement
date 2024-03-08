import { Component, OnInit, TemplateRef } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { UserService } from "../../@core/mock/users.service";
import { HttpParams } from "@angular/common/http";
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from "@nebular/theme";


@Component({
    selector: 'ng-profile-client',
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
    constructor(
        private authService: NbAuthService,
        private userService: UserService, private dialogService: NbDialogService,
        private toastrService: NbToastrService
    ) {
        this.getUser()
    }
    user: any;
    token: ''
    getUser(): void {
        this.authService.getToken().subscribe((accessToken: NbAuthJWTToken | any) => {
            this.token = accessToken.getValue()
            this.userService.getTaiKhoan(this.token).then((res) => {
                this.user = res
                console.log(this.user)
            })
                .catch((err) => {
                    console.log(err)
                })
        })
    }
    async open(dialog: TemplateRef<any>) {
        var data = {
            hinh: this.user.hinh
        }
        this.dialogService.open(
            dialog,
            { context: data });

    }
    handleImageError(event: any) {
        event.target.src = 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg';
    }
    onSaveHinh(data) {

        
        this.user.hinh=data.hinh
        console.log(this.user)
        this.userService.putTaiKhoan(this.user.maSo, this.user).then(() => {
            this.showToast("success", "Thành công!", "Đã cập nhật thông tin.")
        }).catch((error) => {
            this.showToastFalse("warning", "Lỗi!", error.error)
            console.log(error)
        })
    }
    onSaveConfirm(data) {
        console.log(data)

        if (data.hoTen == null || data.hoTen == '') {
            this.showToastFalse("warning", "Lỗi!", "Họ tên không được để trống.")
        }
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
                this.userService.putTaiKhoan(data.maSo, data).then(() => {
                    this.showToast("success", "Thành công!", "Đã cập nhật thông tin.")
                }).catch((error) => {
                    this.showToastFalse("warning", "Lỗi!", error.error)
                    console.log(error)
                })
            }
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