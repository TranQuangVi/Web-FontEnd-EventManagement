import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'QUẢN LÝ',
    group: true,
    
  },
  {
    title: 'Hoạt động',
    icon: 'lock-outline',
    children: [
      {
        title: 'Danh sách hoạt động',
        icon: 'lock-outline',
        link: '/pages/hoatdongs',
      },
      {
        title: 'Chỉnh sửa thông tin',
        icon: 'lock-outline',
        link: '/pages/hoatdongs/danhsach',
      },
    
      {
        title: 'Thêm mới',
        icon: 'lock-outline',
        link: '/pages/hoatdongs/themmoi',
      },
     
    ]
  },
  
  {
    title: 'Phiếu duyệt',
    icon: 'lock-outline',
    link: '/pages/pheduyet',
  },

  
  {
    title: 'THỐNG KÊ',
    group: true,
  },
  {
    title: 'Thống kê',
    icon: 'shopping-cart-outline',
    link: '/pages/thongke/echarts',
  },

  {
    title: 'Trở về trang chủ',
    icon: 'home-outline',
    link: '/client/hoatdong',
  },
  
];
export const MENU_ADMIN: NbMenuItem[] = [

  {
    title: 'QUẢN LÝ',
    group: true,
    
  },
  {
    title: 'Phiếu duyệt',
    icon: 'lock-outline',
    link: '/pages/pheduyet',
  },

  {
    title: 'ADMIN',
    group: true,
  },
  {
    title: 'Loại hoạt động',
    icon: 'lock-outline',
    link: '/pages/loaihoatdongs',
  },
  {
    title: 'Tiêu chí',
    icon: 'lock-outline',
    link: '/pages/tieuchis',
  },
  {
    title: 'Tài khoản',
    icon: 'lock-outline',
    link: '/pages/phanquyen',
    children: [
      {
        title: 'Danh sách tài khoản',
        icon: 'lock-outline',
        link: '/pages/taikhoan', 
      },
      {
        title: 'Danh sách quyền',
        icon: 'lock-outline',
        link: '/pages/taikhoan/phanquyen',
      }
    ]
  },


  {
    title: 'Trở về trang chủ',
    icon: 'home-outline',
    link: '/client/hoatdong',
  },
  
];