import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HoatDongService } from '../../../@core/mock/hoat-dong.service';
import { error } from 'console';

@Component({
  selector: 'ngx-echarts-multiple-xaxis',
  template: `<div class="row"  style="float: right;" >
    <nb-select  matRipple [(selected)]="currentMonthSelect" (selectedChange)="change($event)">
      <nb-option matRipple value="1">Tháng 01</nb-option>
      <nb-option matRipple value="2">Tháng 02</nb-option>
      <nb-option matRipple value="3">Tháng 03</nb-option>
      <nb-option matRipple value="4">Tháng 04</nb-option>
      <nb-option matRipple value="5">Tháng 05</nb-option>
      <nb-option matRipple value="6">Tháng 06</nb-option>
      <nb-option matRipple value="7">Tháng 07</nb-option>
      <nb-option matRipple value="8">Tháng 08</nb-option>
      <nb-option matRipple value="9">Tháng 09</nb-option>
      <nb-option matRipple value="10">Tháng 10</nb-option>
      <nb-option matRipple value="11">Tháng 11</nb-option>
      <nb-option matRipple value="12">Tháng 12</nb-option>
    </nb-select>

    <nb-select matRipple [(selected)]="currentYearSelect"  (selectedChange)="changeY($event)">
      <nb-option matRipple value="2022">Năm 2022</nb-option>
      <nb-option matRipple value="2023">Năm 2023</nb-option>
      <nb-option matRipple value="2024">Năm 2024</nb-option>
    </nb-select>
  </div>
  <br>
  <br>
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsMultipleXaxisComponent implements OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  currentMonthSelect:string= (new Date().getMonth()+1).toString()
  currentYearSelect:string= (new Date().getFullYear()).toString()
  currentMonth
  currentYear
  resuft
  re
  constructor(private theme: NbThemeService, private hoatDongService: HoatDongService) {

  }
  async change(event) {
    console.log(event)
    this.currentMonth = event
    this.resuft = await this.hoatDongService.getByMonth(this.currentMonth, this.currentYear)
    this.create() 
  }
  async changeY(event) {
    console.log(event)
    this.currentYear = event
    this.resuft = await this.hoatDongService.getByMonth(this.currentMonth, this.currentYear)
    this.create() 
  }
  create() {
    this.re = this.resuft
    console.log(this.re)
    const dataTen = this.re.map((item) => {
      const ten: string = item.maHoatDong
      return ten
    })
    
    const dataValueDK = this.re.map((item) => {
      var ten = item.soLuongDangKy
      if (ten == null || ten == '') {
        ten = 0
      }
      return ten
    })
    console.log(dataValueDK)

    const dataValueSL = this.re.map((item) => {
      var ten = item.soLuongSinhVien
      if (ten == null || ten == '') {
        ten = 0
      }
      return ten
    })
    console.log(dataValueSL)
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['Lượt đăng ký','Số lượng ban đầu'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: dataTen
          },

        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [

          {
            name: 'Lượt đăng ký',
            type: 'line',
            smooth: true,
            data: dataValueDK,
          },
          {
            name: 'Số lượng ban đầu',
            type: 'line',
            smooth: true,
            data: dataValueSL,
          },
        ],
      };
    });
  }
  async ngOnInit() {
    const currentDate = new Date();

    this.currentMonth = currentDate.getMonth() + 1; // Lưu ý: getMonth trả về giá trị từ 0 - 11, nên cần cộng thêm 1
    this.currentYear = currentDate.getFullYear();
    this.resuft = await this.hoatDongService.getByMonth(this.currentMonth, this.currentYear)
    this.create()
    // const re = await this.hoatDongService.getByMonth(12, 2023)
    // const a = re.map((item) => {
    //   const ten: string = item.tenHoatDong
    //   return ten
    // })
    // console.log(a)

    // }

    // async ngAfterViewInit() {
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
