import { NbMenuItem } from '@nebular/theme';

export const ACCOUNT_MENU: NbMenuItem[] = [
  {
    title: 'Menu',
    group: true,
  },
  {
    title: 'Tài khoản',
    icon: 'lock-outline',
    link: '/taikhoan',
  },

  {
    title: 'Hoạt động',
    group: true,
  },
  {
    title: 'Hoạt động',
    icon: 'lock-outline',
    link: '/taikhoan/hoatdong',
    
  },

  {
    title: '',
    group: true,
  },
  {
    title: 'Về trang chủ',
    icon: 'lock-outline',
    link: '/client/hoatdong',
    
  },
]