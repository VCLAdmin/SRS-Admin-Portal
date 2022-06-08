import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { OrderService } from '../order.service';
import { OrderApiModel } from 'app/shared/models/OrderApiModel';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  animations: egretAnimations
})
export class OrderTableComponent implements OnInit, OnDestroy {
  public items: OrderApiModel[];
  public completeItems: OrderApiModel[];
  public getItemSub: Subscription;
  public showDeleteButton: boolean = false;
  public showEditButton: boolean = false;
  constructor(
    private snack: MatSnackBar,
    private crudService: OrderService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private jwtAuth: AuthService
  ) { }

  ngOnInit() {
    this.getItems();
    var user = this.jwtAuth.getCurrentUserData();
    this.showDeleteButton = user.AccessRoles.includes("SRSAdministrator") ? true : false;
    //Dealer-Full
    this.showEditButton = user.AccessRoles.includes("SRSAdministrator") || user.AccessRoles.includes("Fabricator") ? true : false;
    //console.log(user.AccessRoles, this.showEditButton);
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data.sort((a, b) => (a.CreatedOn > b.CreatedOn ? -1 : 1));
        this.completeItems = data.sort((a, b) => (a.CreatedOn > b.CreatedOn ? -1 : 1));
        this.items.forEach(element => {
          element.DisableDelete = new Date(element.CreatedOn) > new Date(new Date().setHours(-24));
        });
      })
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isNew: undefined;
  title: string;
  selectedRow: OrderApiModel = undefined;
  resetSideNav() {
    this.isNew = undefined;
    this.title = "";
    this.selectedRow = undefined;
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
    } else {
      var user = this.jwtAuth.getCurrentUserData();
      res.ModifiedByName = user.UserId;
      this.crudService.updateItem(this.selectedRow.OrderExternalId, res)
        .subscribe(data => {
        let statusId: any;
          switch (res.Current_Status) {
            case 'Order Placed':
              statusId = 1;
              break;
            case 'Payment Received':
              statusId = 2;
              break;
            case 'In Pre Production':
              statusId = 3;
              break;
            case 'In Fabrication':
              statusId = 4;
              break;
            case 'In Assembly':
              statusId = 5;
              break;
            case 'Shipped':
              statusId = 6;
              break;
            case 'Delivered':
              statusId = 7;
              break;
            default:
              break;
          }
          if(res.Current_Status !== this.selectedRow.Current_Status) {
            this.crudService.sendMailsforOrder(this.selectedRow.OrderExternalId, statusId, this.selectedRow.ProjectId, this.selectedRow.OrderDetails[0].ProductId).subscribe(re => {
            });
          }
          //this.items = data;
          this.loader.close();
          this.snack.open('Order Updated!', 'OK', { duration: 4000 });
          this.onCloseSideNav("User Added!");
          this.getItems();
        }, error => {
          console.log(error);
          this.loader.close();
        })
    }
  }
  onOpenSideNav(data: any = {}, isNew?) {
    this.isNew = isNew;
    this.title = isNew ? 'Add New Order' : 'Edit Order';
    this.selectedRow = data;
    console.log(data);
    this.sidenav.open()
  }

  deleteItem(row) {
    var deleteorders = this.items.filter(f => f.ProjectId == row?.ProjectId);
    if (deleteorders.length > 1) {
      if (deleteorders.filter(f => f.Current_Process == "Completed").length > 0) {
        this.snack.open('Can`t delete this order because some of the orders are already delivered!', 'OK', { duration: 4000 })
      }
      else {
        this.confirmService.confirm({
          message: `This order has sub orders and by deleting this will also delete all other orders. 
        Are you sure you want to delete this order?`
        }).subscribe(res => {
          if (res) {
            this.loader.open();
            this.crudService.CancelAllProjectOrders(row?.ProjectId)
              .subscribe(data => {
                this.getItems();
                this.loader.close();
                this.snack.open('Deleted entire order!', 'OK', { duration: 4000 })
              })
          }
        });
      }
    } else {
      this.confirmService.confirm({ message: `Delete Order Number: ${row?.ProjectId}-${row?.OrderDetails[0].ProductId}?` })
        .subscribe(res => {
          if (res) {
            this.loader.open();
            this.crudService.deleteOrderById(row)
              .subscribe(data => {
                this.items = data;
                this.loader.close();
                this.snack.open('Order deleted!', 'OK', { duration: 4000 })
              })
          }
        });
    }
  }

  DownloadFile(row) {
    if (row.OrderId !== null) {
      this.crudService.DownloadDesignDocument(row.OrderId).subscribe(data => {
        const url: string = data as string;
        window.open(url, '_blank');
      });
    }
  }

  DownloadBomFile(row) {
    if (row.OrderId !== null) {
      // this.crudService.DownloadBomDocument(row.OrderId).subscribe(data => {
      //   const url: string = data as string;
      //   window.open(url, '_blank');
      // });
      this.crudService.GetProposalFile(row?.OrderDetails[0].ProductGuid, "BOM").subscribe(result => {
        let blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let url1 = window.URL.createObjectURL(blob);
        window.open(url1);
      });
    }
  }

  OpenProposalFile(row) {
    if (row.OrderId !== null) {
      this.crudService.GetProposalFile(row?.OrderDetails[0].ProductGuid, "Proposal").subscribe(result => {
        let blob = new Blob([result], { type: 'application/pdf' });
        let url1 = window.URL.createObjectURL(blob);
        window.open(url1);
      });
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.items = this.completeItems;
    var columns = Object.keys(this.items[0]);
    if (!columns.length)
      return;
    const rows = this.completeItems.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        } else if (column == "OrderDetails" && d[column] && d[column][0].ProductId.toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.items = rows;
  }
}
function saveAs(file: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

