import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { UserService } from '../../../@core/mock/users.service';
import { NbAuthJWTToken, NbAuthService, NbAuthStrategy, NbPasswordAuthStrategy, NbTokenStorage } from '@nebular/auth';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'default';
  token: string = "";
  userMenu = [{ title: 'Tài khoản', link: '/taikhoan' }, { title: 'Đăng xuất' }];

  logout() {
    this.user = undefined
    this.userService.logout()
  }

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: NbAuthService,
    private router: Router,
    private store: NbTokenStorage,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }))
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event) => {
      // console.log(event)
      if (event.item.title == 'Đăng xuất') {
        this.logout()
      }
    })
    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
    if (!this.store.get().isValid() || this.store.get() == undefined || this.store.get() == null) {
      console.log(this.store.get().isValid())
      this.logout()
    }
    else {
      this.token = this.userService.getToken()
      this.userService.getTaiKhoan(this.token).then((res) => {
        this.user = { name: res.hoTen, picture: res.hinh }
      }).catch((error) => {
        if (error.status == 403) {
          this.logout()
        }
      })
      if(this.userService.hasAdminRole('GIANGVIEN')||this.userService.hasAdminRole('ADMIN')){
        this.userMenu = [{ title: 'Tài khoản', link: '/taikhoan' },{ title: 'Trang chú admin', link: '/pages/hoatdongs' }, { title: 'Đăng xuất' }];
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
