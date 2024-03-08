import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService, NbTokenStorage } from '@nebular/auth';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable()
export class UserService extends UserData {

  private apiUrl = 'http://localhost:8080/tai-khoan'
  jwt: string
  headers = new HttpHeaders()
  constructor(httpClient: HttpClient, private authService: NbAuthService, private store: NbTokenStorage, private router: Router) {
    super(httpClient)
    if (!this.store.get().isValid()) {
      this.logout()
    }

    this.authService.getToken().subscribe((accessToken: NbAuthJWTToken | any) => {
      this.jwt = accessToken.getValue()
    })
    console.log(this.jwt)
    this.getTaiKhoan(this.jwt).then(() => {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.jwt}`,
      });
    }).catch((error) => {
      this.logout()
    })

  }
  logout() {
    this.jwt=null
    this.headers=null
    this.store.clear()
    this.router.navigate(['auth/login']);
    
  }
  getToken() {
    return this.jwt;
  }

  private time: Date = new Date;

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.users.nick, type: this.types.mobile },
    { user: this.users.eva, type: this.types.home },
    { user: this.users.jack, type: this.types.mobile },
    { user: this.users.lee, type: this.types.mobile },
    { user: this.users.alan, type: this.types.home },
    { user: this.users.kate, type: this.types.work },
  ];
  private recentUsers: RecentUsers[] = [
    { user: this.users.alan, type: this.types.home, time: this.time.setHours(21, 12) },
    { user: this.users.eva, type: this.types.home, time: this.time.setHours(17, 45) },
    { user: this.users.nick, type: this.types.mobile, time: this.time.setHours(5, 29) },
    { user: this.users.lee, type: this.types.mobile, time: this.time.setHours(11, 24) },
    { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(10, 45) },
    { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 42) },
    { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 31) },
    { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(8, 0) },
  ];

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }

  getTaiKhoan(jwt: string) {
    let header = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`,
    });
    var headers = {
      headers: header,
    }
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.get(`${this.apiUrl}/${jwt}`, headers).toPromise();
        //  console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    })
  }

  getRole(): any {
    try {
      const role = jwtDecode(this.jwt);

      return role
    } catch (Error) {
      return null;
    }
  }
  hasAdminRole(role: string): boolean {
    const userRole = this.getRole().role
    return userRole.some(item => item.authority === role);
  }
  getTenTaiKhoanByMaSo(maSo: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.get(`${this.apiUrl}/thong-tin/${maSo}`, { headers: this.headers }).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    })
  }

  getByRoleTaiKhoan(role: string,params: HttpParams) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.get(`${this.apiUrl}/danh-sach/${role}`, { headers: this.headers,params }).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    })
  }

  postTaiKhoan(params: HttpParams) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.post(`${this.apiUrl}/sign-up`,params, { headers: this.headers }).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    })
  } 
  putTaiKhoan(maSo:string,params: HttpParams) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.put(`${this.apiUrl}/update/${maSo}`,params, { headers: this.headers }).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    })
  }
}
