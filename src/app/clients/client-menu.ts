import { NbMenuItem } from '@nebular/theme';
import { TieuChiService } from '../@core/mock/tieu-chi.service';
import { HttpParams } from '@angular/common/http';


export class ClientMenu {
  // Thêm constructor vào đây
  constructor(private tieuChiService: TieuChiService) {
    // Các thao tác khởi tạo bạn muốn thực hiện
    
    //for(let i ;i<d)
  }

   getAllTieuChi ():any{
    let params = new HttpParams();
      params = params.set('page', 0);
      params = params.set('size', 10);
  
      this.tieuChiService.getData(params).then((res)=>{
        console.log(res)
      })
    return {
      title: 'Hoạt động đang mở',
      icon: 'lock-outline',
      link: '/client/hoatdong/search',
      queryParams: { key: 'tieuchi', value: 'HOCTAP' },
    };
  };


 CLIENT_MENU: NbMenuItem[] = [
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
    title: 'THỐNG KÊ',
    group: true,
  },
  {
    title: 'Thống kê',
    icon: 'shopping-cart-outline',
    link: '/pages/thongke/echarts',
  },
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Trở về trang chủ',
    icon: 'home-outline',
    link: '/client/hoatdong',
  },
  {
    title: 'Trang chủ',
    link: '/client/hoatdong',
    icon: 'lock-outline',
  },
  {
    title: 'Tiêu chí',
    icon: 'lock-outline',
    children: [
      this.getAllTieuChi()
    ]
  },
  {
    title: 'Loại hoạt động',
    children: [
      {
        title: 'Hoạt động đang mở',
        icon: 'lock-outline',
        link: '/',
      },
      {
        title: 'Hoạt động đã đăng ký',
        icon: 'lock-outline',
        link: '/',
      },]
  },
  {
    title: 'Sắp xếp',
    children: [
      {
        title: 'Mới nhất',
        icon: 'lock-outline',
        link: '/',
      },
      {
        title: 'Cũ nhất',
        icon: 'lock-outline',
        link: '/',
      },]
  }
]

}

