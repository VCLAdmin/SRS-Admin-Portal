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

 /**
 * This function is used to get the list of Financials
 *
 */
  getItems() {
    this.getItemSub = this.crudService.getFinancials()
      .subscribe(data => {
        this.items = data.sort((a, b) => (a.DealerName < b.DealerName ? -1 : 1));
        this.completeFinancialItems = data.sort((a, b) => (a.DealerName < b.DealerName ? -1 : 1));
        this.items = this.items.map(x => { x.OpeningBalance = x.OrdersToDate - x.PaidToDate; return x });
        this.getCompleteOrders();
      })
  }

 /**
 * This function is used to get the list of Complete Orders
 *
 */
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

 /**
 * This function is used to reset the side nav when user clicks on the Financials
 *
 */
  resetSideNav() {
    this.isNew = undefined;
    this.title = "";
    this.selectedRow = undefined;
    this.selectedDealerOrders = undefined;
  }

 /**
 * This function is used to close the side nav of a selected financial
 *
 */
  onCloseSideNav(reason: string) {
    this.resetSideNav();
    this.sidenav.close();
  }

 /**
 * This function is used to submit the financial form data when the user updates the financial data in the side nav
 *
 * @param {any} res is the form data which needs to be submitted.
 */
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

 /**
 * This function is used to open the financial side nav when user selects the financial
 *
 * @param {any} data is the selected financial object to diplay in the form if it is in edit and this object will be empty if it is to add financial
 * 
 * @param {boolean} isNew this is the value which tells the Financial needs to open for update or create new.
 * 
 */
  onOpenSideNav(data: any = {}, isNew?) {
    this.openSideNavType = "EDIT";
    this.isNew = isNew;
    this.title = isNew ? 'Add New Financial' : 'Update Financial';
    this.selectedRow = data;
    this.sidenav.open()
  }

 /**
 * This function is used to open the financial details in  side nav when user selects the financial
 *
 * @param {any} data is the selected financial object to diplay in the form 
 * 
 */
  onDetailsSideNav(data: any = {}) {
    this.openSideNavType = "ORDERDETAILS";
    this.selectedDealerOrders = this.completeItems.filter(f => f.DealerId == data.DealerId);
    this.sidenav.open()
  }

 /**
 * This function is used to filter the data with the given input by the user.
 *
 * @param {any} event is the input given by the user based on this the data will be filtered and displayed.
 * 
 */
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
