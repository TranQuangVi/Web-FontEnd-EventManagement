import { HttpClient ,HttpParams} from "@angular/common/http";


export abstract class HoatDongData {
    constructor(public readonly httpClient: HttpClient) { }
    abstract getAll(params);
    abstract getById(params);
    abstract putHoatDong(id,params);

}

export interface CtNoiDung {
    maNoiDung:string;
    tenTaiKhoan: string;
    thoiLuongTrinhBay: string;
    linkBaiTrinhBay: string;
    qua: string;
    ghiChu: string;
  }