import { Component, OnInit } from "@angular/core";
import { NbButtonModule, NbComponentSize, NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { HoatDongService } from "../../@core/mock/hoat-dong.service";
import { HttpParams } from "@angular/common/http";
import { constants } from "buffer";
import { LocalDataSource } from "ng2-smart-table";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'ng-hoatdong-client',
    templateUrl: "./search.component.html",
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
    constructor(private hoatDongService: HoatDongService, private authService: NbAuthService,
        private toastrService: NbToastrService, private route: ActivatedRoute) {
        this.params = this.params.set('page', 0);
        this.params = this.params.set('size', 1000);
    }
    listHoatDong: any
    params = new HttpParams();
    //  source: LocalDataSource = new LocalDataSource();
    dangKyConfirm(maHoatDong: string): void {
        console.log(maHoatDong)
        //  var param = new HttpParams() 
        //param=param.set('maHoatDong', maHoatDong )
        this.hoatDongService.postDangKy(maHoatDong).then(() => {
            this.showToast('success', "Thành công!", "Chúc mừng bạn đã đăng ký thành công!");
        })
            .catch((error) => {
                console.log(error)
                this.showToastFalse('danger', "Thất bại!", "Đã xảy ra lỗi: " + error.error);
            });

    }
    hetLuot(){
        this.showToastFalse('warning', "Thất bại!", "Đã hết số lượng đăng ký" );
      }
    handleImageError(event: any) {
        event.target.src = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
    }
    hinh: string = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg'
    imgDef(): boolean {
        console.log("false")
        return false
    }
    
    async ngOnInit(): Promise<void> {
        let params = new HttpParams()
        this.route.queryParamMap.subscribe(routeParams => {
            params = params.set('key', routeParams.get('key'))
            params = params.set('value', routeParams.get('value'))
            this.hoatDongService.getBySearch(params).then((resuft) => {
                this.listHoatDong = resuft
    
            })
        });
       
        // const result= await this.hoatDongService.getAll(this.params);
        // this.listHoatDong = result.content;

        //   this.source.load(result.content)
        // console.log(this.listHoatDong)
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