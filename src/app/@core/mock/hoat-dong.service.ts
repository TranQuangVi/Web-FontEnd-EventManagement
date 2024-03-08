import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HoatDongData } from '../data/hoat-dong';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserService } from './users.service';

@Injectable()
export class HoatDongService extends HoatDongData {
    private apiUrl = 'http://localhost:8080/hoat-dong'
    jwt: string;
    header: HttpHeaders

    constructor(httpClient: HttpClient, private authService: NbAuthService, private userService: UserService) {
        super(httpClient)
        this.jwt = userService.getToken()
        this.header = new HttpHeaders({
            'Authorization': `Bearer ${this.jwt}`,
        })

    }

    getById(id: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/${id}`, { headers: this.header }).toPromise();
                //  console.log(result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    getNoiDungAccepted(id: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/accepted/${id}`, { headers: this.header }).toPromise();
                //  console.log(result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    getAll(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}`, { headers: this.header, params }).toPromise();
                //  console.log(result)
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }
    getByMonth(month: number, year:number) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/${month}/${year}`, { headers: this.header }).toPromise();
               //   console.log(result)
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }

    getBySearch(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/search`,  {headers:this.header,params}).toPromise();
                //  console.log(result)
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }



    postHoatDong(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                console.log(this.header, params)
                const result = await this.httpClient.post(`${this.apiUrl}/update`, params, { headers: this.header }).toPromise();
                //    console.log('api',result);
                resolve(result);
            } catch (error) {
                //  console.log('api',error);

                reject(error);
            }
        });
    }



    putHoatDong(id: string, params: any) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                // const data= params;
                const result = await this.httpClient.put(`${this.apiUrl}/${id}`, params, { headers: this.header }).toPromise();
                //  console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteHoatDong(id: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.delete(`${this.apiUrl}/${id}`, { headers: this.header }).toPromise();
                //  console.log(result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }



    getNoiDung(id: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/noi-dung/${id}`, { headers: this.header }).toPromise();
                //   console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteNoiDung(id: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.delete(`${this.apiUrl}/noi-dung/${id}`, { headers: this.header }).toPromise();
                //   console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    postNoiDung(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.post(`${this.apiUrl}/noi-dung`, params, { headers: this.header }).toPromise();
                //  console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    putNoiDung(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.put(`${this.apiUrl}/noi-dung`,params, { headers: this.header  }).toPromise();
                //  console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    getCTNoiDung(id: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/noi-dung/chi-tiet/${id}`, { headers: this.header }).toPromise();
                //   console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    createCtNoiDung(params: HttpParams,maNoiDung:string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.post(`${this.apiUrl}/noi-dung/chi-tiet/${maNoiDung}`,params, { headers: this.header, params }).toPromise();
                //  console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    putCtNoiDung(params: HttpParams,key:any) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.put(`${this.apiUrl}/noi-dung/chi-tiet/${key.maNoiDung}/${key.maSo}`,params, { headers: this.header, params }).toPromise();
                //  console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    delCtNoiDung(key:any) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.delete(`${this.apiUrl}/noi-dung/chi-tiet/${key.maNoiDung}/${key.maSo}`, { headers: this.header }).toPromise();
                //  console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    postDangKy(maHoatDong: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const body=''
                const result = await this.httpClient.post(`${this.apiUrl}/dang-ky/${maHoatDong}`,body,{headers: this.header }).toPromise();
                //  console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    postDiemDanh(maHoatDong: string, params: any) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.post(`${this.apiUrl}/diem-danh/${maHoatDong}`, params, { headers: this.header }).toPromise();
                //console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    getDSDangKy(maHoatDong: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/danh-sach-dang-ky/${maHoatDong}`, { headers: this.header }).toPromise();
                //console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }


    getByTrangThai(params: HttpParams) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/trang-thai`, { headers: this.header, params: params }).toPromise();
                //console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    putTrangThai(maHoatDong: string, params: HttpParams) {
        const body=''
        return new Promise<any>(async (resolve, reject) => {
            try {
                console.log(this.header)
                const result = await this.httpClient.put(`${this.apiUrl}/cap-nhat-trang-thai/${maHoatDong}`,body, { headers: this.header,params:params }).toPromise();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    getHoatDongDK() {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/sinh-vien-dang-ky`, { headers: this.header }).toPromise();
                //console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    getHoatDongThamGia() {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const result = await this.httpClient.get(`${this.apiUrl}/sinh-vien-tham-gia`, { headers: this.header }).toPromise();
                //console.log('api',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}

