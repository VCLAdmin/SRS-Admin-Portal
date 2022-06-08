import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { DealerService } from '../dealer.service';
import { FinancialApiModel } from 'app/shared/models/FinancialApiModel';
import { BasicSnackbarComponent } from 'app/views/basic-snackbar/basic-snackbar.component';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { OrderService } from '../order.service';
import { OrderApiModel } from 'app/shared/models/OrderApiModel';

@Component({
  selector: 'app-financial-table',
  templateUrl: './financial-table.component.html',
  styleUrls: ['./financial-table.component.scss']
})
export class FinancialTableComponent implements OnInit, OnDestroy {
  public items: FinancialApiModel[];
  public completeFinancialItems: FinancialApiModel[];
  public completeItems: OrderApiModel[];
  public getItemSub: Subscription;
  public getCompleteItemSub: Subscription;
  superAdmin: boolean = false;
  fabricator: boolean = false;
  itemTableColumn: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  constructor(
    private snack: MatSnackBar,
    private crudService: DealerService,
    private crudOrderService: OrderService,
    private loader: AppLoaderService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    var user = this.authService.getCurrentUserData();
    this.superAdmin = user.AccessRoles.includes("SRSAdministrator") ? true : false;
    this.fabricator = user.AccessRoles.includes("Fabricator") ? true : false;
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
    if (this.getCompleteItemSub) {
      this.getCompleteItemSub.unsubscribe()
    }
  }
  getItems() {
    this.getItemSub = this.crudService.getFinancials()
      .subscribe(data => {
        this.items = data.sort((a, b) => (a.DealerName < b.DealerName ? -1 : 1));
        this.completeFinancialItems = data.sort((a, b) => (a.DealerName < b.DealerName ? -1 : 1));
        this.items = this.items.map(x => { x.OpeningBalance = x.OrdersToDate - x.PaidToDate; return x });
        this.getCompleteOrders();
      })
  }
  getCompleteOrders() {
    this.getCompleteItemSub = this.crudOrderService.getCompleteList()
      .subscribe(data => {
        this.completeItems = data.sort((a, b) => (a.DealerName < b.DealerName ? -1 : 1));
      })
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isNew: undefined;
  title: string;
  selectedRow: FinancialApiModel = undefined;
  selectedDealerOrders: OrderApiModel[] = undefined;
  resetSideNav() {
    this.isNew = undefined;
    this.title = "";
    this.selectedRow = undefined;
    this.selectedDealerOrders = undefined;
  }
  onCloseSideNav(reason: string) {
    this.resetSideNav();
    this.sidenav.close();
  }
  onSubmitData(res: any) {
    if (!res) {
      // If user press cancel
      return;
    }
    this.loader.open();
    if (this.isNew) {
      this.crudService.addItem(res)
        .subscribe(data => {
          this.items = data;
          this.loader.close();
          this.snack.open('Financial Added!', 'OK', { duration: 4000 });
          this.onCloseSideNav("Financial Added!");
          this.getItems();
        })
    } else {
      if (this.superAdmin) {
        this.crudService.updateFinancial(this.selectedRow.FinancialExternalId, res)
          .subscribe(data => {
            this.items = data;
            this.loader.close();
            this.snack.open('Financial Updated!', 'OK', { duration: 4000 });
            this.onCloseSideNav("Financial Updated!");
            this.getItems();
          })
      } else {
        this.loader.close();
        this.snack.openFromComponent(BasicSnackbarComponent, {
          data: "Don't have permissions to update.",
          duration: 4000,
          panelClass: 'error'
        });
        this.onCloseSideNav("Don't have permissions to update!");
        this.getItems();
      }
    }
  }
  openSideNavType = "";
  onOpenSideNav(data: any = {}, isNew?) {
    this.openSideNavType = "EDIT";
    this.isNew = isNew;
    this.title = isNew ? 'Add New Financial' : 'Update Financial';
    this.selectedRow = data;
    this.sidenav.open()
  }
  onDetailsSideNav(data: any = {}) {
    this.openSideNavType = "ORDERDETAILS";
    this.selectedDealerOrders = this.completeItems.filter(f => f.DealerId == data.DealerId);
    this.sidenav.open()
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.items = this.completeFinancialItems;
    var columns = Object.keys(this.items[0]);
    if (!columns.length)
      return;
    const rows = this.completeFinancialItems.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        } if (d[column] && d[column].toString().toLowerCase().indexOf(val.replace(",", '')) > -1) {
          return true;
        }
      }
    });
    this.items = rows;
  }
}
