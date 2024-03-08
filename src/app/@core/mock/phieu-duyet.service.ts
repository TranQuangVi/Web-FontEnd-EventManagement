import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HoatDongData } from '../data/hoat-dong';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { PhieuDuyetData } from '../data/phieu-duyet';

@Injectable()
export class PhieuDuyetService extends PhieuDuyetData {
    private apiUrl = 'http://localhost:8080/phieu-phe-duyet'
    jwt: string;
    header: HttpHeaders

    constructor(httpClient: HttpClient, private authService: NbAuthService) {
        super(httpClient)
        this.authService.getToken().subscribe((accessToken: NbAuthJWTToken | any) => {
            this.jwt = accessToken.getValue()
        })
        this.header = new HttpHeaders(
            {
                'Authorization': `Bearer ${this.jwt}`,
            }
        )

    }
    getAll(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}`, { headers: this.header }).toPromise();
                //  console.log(result)
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }
    postPhieu(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.post(`${this.apiUrl}`,params, { headers: this.header }).toPromise();
                //  console.log(result)
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }
    putTrangThai(maPhieu: string, params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.put(`${this.apiUrl}/duyet-phieu/${maPhieu}`,params, { headers: this.header }).toPromise();
                //  console.log(result)
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }
    getById(){
        
    }
}