import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppconstantsService } from 'app/shared/services/appconstants.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { ThemeService } from 'app/shared/services/theme.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fabricator-dashboard',
  templateUrl: './fabricator-dashboard.component.html',
  styleUrls: ['./fabricator-dashboard.component.scss'],
})
export class FabricatorDashboardComponent implements OnInit {
  colorPalette = ['#9ACD32', '#556B2F', '#6B8E23', '#7CFC00', '#7FFF00', '#ADFF2F', '#006400', '#008000',
    '#228B22', '#00FF00', '#32CD32', '#90EE90', '#98FB98', '#8FBC8F', '#00FA9A', '#00FF7F', '#2E8B57',
    '#66CDAA', '#3CB371', '#20B2AA', '#2F4F4F', '#008080', '#008B8B', '#00FFFF', '#00FFFF', '#E0FFFF',
    '#00CED1', '#40E0D0', '#48D1CC', '#AFEEEE', '#7FFFD4']

  public getItem2Sub: Subscription;
  fabricatorOrdersData: any;
  fabricatorOrdersOptions: any;
  fabricatorOrders: any;

  public getItemSub: Subscription;
  orderByStatusData: any;
  orderByStatusOptions: any;
  orderByStatus: any;

  public getItem1Sub: Subscription;
  orderByMonthsOptions: any;
  orderByMonths: any;
  orderByMonthsData: any;
  fabricatorUser = false;
  constructor(private appConstantService: AppconstantsService,
    private jwtAuth: AuthService,
    private http: HttpClient,
    private themeService: ThemeService) { }

  ordersPlaced = 0;
  ordersCompleted = 0;
  getFabricatorOrdersType = "Count";
  getOrderForMonthType = "Count";

  ngOnInit(): void {
    this.getItemsForOrder("Count");
    this.getFabricatorOrders(this.getFabricatorOrdersType);
    this.getOrderForMonth(this.getOrderForMonthType);
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initOrderByStatusChart(activeTheme);
      this.initOrderByMonthChart(activeTheme);
      this.initfabricatorOrdersChart(activeTheme);
    });

    var user = this.jwtAuth.getCurrentUserData();
    this.fabricatorUser = user.AccessRoles.includes("Fabricator") ? true : false;
  }

  /*-- Start Items Per Orders -------------------------------------------------------*/
  getItemsForOrder(getType: string) {
    this.ordersPlaced = 0;
    this.ordersCompleted = 0;
    this.getItemSub = this.getItemsForFabricatorDashboard(getType)
      .subscribe(data => {
        console.log('order data by status', data);
        var i = 0;
        data.forEach(element => {
          this.ordersPlaced += element;
          if (i == 5)
            this.ordersCompleted += element;
          i++;
        });
        this.orderByStatusData = data;
        this.initOrderByStatusChart(this.themeService.activatedTheme);
      })
  }
  getItemsForFabricatorDashboard(getType: string): Observable<number[]> {
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
  getAllOrders(getType: string): Observable<any[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/GetOrderByDealer/" + getType;
    return this.http.get<any[]>(url);
  }
  getFabricatorOrders(getType: string) {
    this.getFabricatorOrdersType = getType == "Count" ? "Amount" : "Count";
    this.getItem2Sub = this.getAllOrders(getType)
      .subscribe(data => {
        console.log('fabricator data', data);
        this.fabricatorOrdersData = data;
        this.initfabricatorOrdersChart(this.themeService.activatedTheme);
      })
  }
  initfabricatorOrdersChart(theme) {
    let dealersList = [];
    let dealersTotalOrders = [];
    this.fabricatorOrdersData.forEach(i => {
      dealersList.push(i.DealerName);
      dealersTotalOrders.push(i.TotalOrders);
    });

    this.fabricatorOrdersOptions = {
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
    this.fabricatorOrders = {
      series: { name: 'Orders', type: 'bar', stack: 'month', data: dealersTotalOrders }
    };
  }
  getOrderForMonth(getType: string) {
    this.getOrderForMonthType = getType == "Count" ? "Amount" : "Count";
    this.getItem1Sub = this.getAllOrders(getType)
      .subscribe(data => {
        this.orderByMonthsData = data;
        this.initOrderByMonthChart(this.themeService.activatedTheme);
      })
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
}
