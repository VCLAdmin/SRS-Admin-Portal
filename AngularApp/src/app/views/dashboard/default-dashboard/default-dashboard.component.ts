import { HttpClient } from '@angular/common/http';
import * as echarts from "echarts";
import { Z } from "@angular/cdk/keycodes";
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { OrderApiModel } from 'app/shared/models/OrderApiModel';
import { AppconstantsService } from 'app/shared/services/appconstants.service';
import { ThemeService } from 'app/shared/services/theme.service';
import { OrderService } from 'app/views/cruds/order.service';
import { Observable, Subscription } from 'rxjs';
import tinyColor from 'tinycolor2';

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss'],
  animations: egretAnimations
})
export class DefaultDashboardComponent implements OnInit {
  //colorPalette = ['rgba(15, 21, 77, 0.8)', 'rgba(246,107,191, 0.8)', '#03A9F4', '#FFC107', 'rgba(15, 21, 77, 0.6)', '#9C27BB', 'rgba(15, 21, 77, 0.4)', 'rgba(146, 213, 249, 0.8)', '#9C27B0'];
  colorPalette = ['#9ACD32', '#556B2F', '#6B8E23', '#7CFC00', '#7FFF00', '#ADFF2F', '#006400', '#008000',
    '#228B22', '#00FF00', '#32CD32', '#90EE90', '#98FB98', '#8FBC8F', '#00FA9A', '#00FF7F', '#2E8B57',
    '#66CDAA', '#3CB371', '#20B2AA', '#2F4F4F', '#008080', '#008B8B', '#00FFFF', '#00FFFF', '#E0FFFF',
    '#00CED1', '#40E0D0', '#48D1CC', '#AFEEEE', '#7FFFD4']

  public getItemSub: Subscription;
  orderByStatusOptions: any;
  orderByStatus: any;
  orderByStatusData: any;

  public getItem1Sub: Subscription;
  orderByMonthsOptions: any;
  orderByMonths: any;
  orderByMonthsData: any;

  public getItem2Sub: Subscription;
  dealerOrdersOptions: any;
  dealerOrders: any;
  dealerOrdersData: any;
  getOrderForMonthType = "Count";
  getDealerOrdersType = "Count";

  constructor(
    private themeService: ThemeService,
    private appConstantService: AppconstantsService,
    private http: HttpClient
  ) { }

  ngAfterViewInit() { }
  ngOnInit() {
    this.getItemsForOrder("Count");
    this.getOrderForMonth(this.getOrderForMonthType);
    this.getDealerOrders(this.getDealerOrdersType);
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initOrderByStatusChart(activeTheme);
      this.initOrderByMonthChart(activeTheme);
      this.initDealerOrdersChart(activeTheme);
    });
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
    if (this.getItem1Sub) {
      this.getItem1Sub.unsubscribe();
    }
    if (this.getItem2Sub) {
      this.getItem2Sub.unsubscribe();
    }
  }
  /*-- Start Items Per Orders -------------------------------------------------------*/
  getItemsForOrder(getType: string) {
    this.getItemSub = this.getItemsForOrderDashboard(getType)
      .subscribe(data => {
        this.orderByStatusData = data;
        this.initOrderByStatusChart(this.themeService.activatedTheme);
      })
  }
  getItemsForOrderDashboard(getType: string): Observable<number[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/GetOrderDashboard/" + getType;
    return this.http.get<number[]>(url);
  }
  initOrderByStatusChart(theme) {
    this.orderByStatusOptions = {
      color: this.colorPalette,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: [
          this.orderByStatusData[0]>1 ? 'Products Ordered' : 'Product Ordered',
          this.orderByStatusData[1]>1 ?'Products In Pre-production': 'Product In Pre-production',
          this.orderByStatusData[2]>1 ?'Products In Fabrication' : 'Product In Fabrication',
          this.orderByStatusData[3]>1 ?'Products In Assembly' : 'Product In Assembly',
          this.orderByStatusData[4]>1 ?'Products Shipped' : 'Product Shipped',
          this.orderByStatusData[5]>1 ?'Products Delivered' : 'Product Delivered'
        ],
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          name: "Traffic",
          label: { show: false, color: "#0168c1" },
          type: "bar",
          barGap: 0,
          smooth: true
        },
      ]
    };

    this.orderByStatus = {
      series: [
        {
          data: this.orderByStatusData
        },
      ]
    };
  }
  /*-- End Items Per Orders -------------------------------------------------------*/


  /*-- Start Orders Per Month -------------------------------------------------------*/
  getOrderForMonth(getType: string) {
    this.getOrderForMonthType = getType == "Count" ? "Amount" : "Count";
    this.getItem1Sub = this.getAllOrders(getType)
      .subscribe(data => {
        this.orderByMonthsData = data;
        this.initOrderByMonthChart(this.themeService.activatedTheme);
      })
  }
  getAllOrders(getType: string): Observable<any[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/GetOrderByDealer/" + getType;
    return this.http.get<any[]>(url);
  }
  initOrderByMonthChart(theme) {
    this.orderByMonthsOptions = {
      color: this.colorPalette,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          type: "bar",
          barGap: 0,
          smooth: true
        },
      ]
    };
    //console.log(this.orderByMonthsData)
    let seriesData = [];
    this.orderByMonthsData.forEach(element => {
      seriesData.push({ name: element.DealerName, type: 'bar', stack: 'month', data: element.MonthOrders });
    });
    this.orderByMonths = {
      series: seriesData
    };
  }
  /*-- End Orders Per Month -------------------------------------------------------*/
  /*-- Start Orders Per Month -------------------------------------------------------*/
  getDealerOrders(getType: string) {
    this.getDealerOrdersType = getType == "Count" ? "Amount" : "Count";
    this.getItem2Sub = this.getAllOrders(getType)
      .subscribe(data => {
        this.dealerOrdersData = data;
        this.initDealerOrdersChart(this.themeService.activatedTheme);
      })
  }
  initDealerOrdersChart(theme) {
    let dealersList = [];
    let dealersTotalOrders = [];
    this.dealerOrdersData.forEach(i => {
      dealersList.push(i.DealerName);
      dealersTotalOrders.push(i.TotalOrders);
    });

    this.dealerOrdersOptions = {
      color: this.colorPalette,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: dealersList
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          label: { show: false, color: "#0168c1" },
          type: "bar",
          barGap: 0,
          smooth: true
        },
      ]
    };
    this.dealerOrders = {
      series: { name: 'Orders', type: 'bar', stack: 'month', data: dealersTotalOrders }
    };
  }
  /*-- End Orders Per Month -------------------------------------------------------*/
}
