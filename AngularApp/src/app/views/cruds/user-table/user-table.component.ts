import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { SRSUserService } from '../srsuser.service';
import { SRSUserApiModel } from 'app/shared/models/SRSUserApiModel';
import { BasicSnackbarComponent } from 'app/views/basic-snackbar/basic-snackbar.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations: egretAnimations
})
export class UserTableComponent implements OnInit, OnDestroy {
  public items: SRSUserApiModel[];
  public completeItems: SRSUserApiModel[];
  public completeItemsWithTypeFilter: SRSUserApiModel[];
  public getItemSub: Subscription;
  public allUserTypes: string[] = ['All', 'Dealers', 'Fabricators'];
  public userTypeSelection: string = 'All';
  constructor(
    private snack: MatSnackBar,
    private crudService: SRSUserService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

 /**
 * This function is used to get the list of Users.
 *
 */
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data;
        this.completeItems = data;
        this.completeItemsWithTypeFilter = data;
      })
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isNew: undefined;
  title: string;
  selectedRow: SRSUserApiModel = undefined;

 /**
 * This function is used to reset the side nav when user clicks on the Users
 *
 */
  resetSideNav() {
    this.isNew = undefined;
    this.title = "";
    this.selectedRow = undefined;
  }

 /**
 * This function is used to close the side nav of a selected user
 *
 */
  onCloseSideNav(reason: string) {
    this.resetSideNav();
    this.sidenav.close();
  }

 /**
 * This function is used to submit the user form data when the user updates the user data in the side nav
 *
 * @param {any} res is the user form object which needs to be submitted.
 * 
 */
  onSubmitData(res: any) {
    if (!res) {
      return;
    }
    if (res.isDealer) {
      res.dataInfo.FabricatorId = 0;
    } else {
      res.dataInfo.DealerId = 0;
    }
    this.loader.open();
    if (this.isNew) {
      this.crudService.addItem(res.dataInfo)
        .subscribe(data => {
          this.completeItems = data;
          this.UserTypeChanged(this.userTypeSelection);
          this.loader.close();
          this.snack.open('Account Added!', 'OK', { duration: 4000 })
          this.onCloseSideNav("Account Added!");
        })
    } else {
      this.crudService.updateItem(this.selectedRow.UserGuid, res.dataInfo)
        .subscribe(data => {
          this.completeItems = data;
          this.UserTypeChanged(this.userTypeSelection);
          this.loader.close();
          this.snack.open('Account Updated!', 'OK', { duration: 4000 })
          this.onCloseSideNav("Account Updated!");
        })
    }
  }

 /**
 * This function is used to open the user side nav when user selects the user
 *
 * @param {any} data is the selected user object to diplay in the form if it is in edit and this object will be empty if it is to add user
 * 
 * @param {boolean} isNew this is the value which tells the user needs to open for update or create new.
 * 
 */
  onOpenSideNav(data: any = {}, isNew?) {
    this.isNew = isNew;
    this.title = isNew ? 'Add New Account' : 'Update Account';
    this.selectedRow = data;
    this.sidenav.open()
  }

 /**
 * This function is called when user click on the delete icon of any particular user from the list.
 * 
 * It deletes the user from the list and the db is updated
 *
 * @param {any} row is the selected user object which is to delete
 * 
 */
  deleteItem(row) {
    this.confirmService.confirm({ message: `Delete ${row.Email}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.canRemoveItem(row).subscribe(returnVal => {
            if (returnVal == true) {
              this.crudService.removeItem(row)
                .subscribe(data => {
                  this.completeItems = data;
                  this.UserTypeChanged(this.userTypeSelection);
                  this.loader.close();
                  this.snack.open('Account deleted!', 'OK', { duration: 4000 })
                });
            } else {
              this.loader.close();
              this.snack.openFromComponent(BasicSnackbarComponent, {
                data: 'Account Cannot be deleted!',
                duration: 4000,
                panelClass: 'error'
              });
            }

          });


        }
      })
  }

 /**
 * This function is used to filter the data with the given input by the user.
 *
 * @param {any} event is the input given by the user based on this the data will be filtered and displayed.
 * 
 */
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.items[0]);
    // Removes last "$$index" from "column"
    // columns.splice(columns.length - 1);
    // console.log(columns);
    if (!columns.length)
      return;
    const rows = this.completeItems.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.items = rows;
  }

 /**
 * This function is called when the user has changed the type of User.
 *
 * @param {any} event is the input selected by the user
 * 
 */
  UserTypeChanged(event) {
    switch (event) {
      case 'All':
        this.items = this.completeItems;
        break;

      case 'Dealers':
        this.items = this.completeItems.filter(x => x.FabricatorId == 0);
        break;

      case 'Fabricators':
        this.items = this.completeItems.filter(x => x.DealerId == 0);
        break;
    }
  }
}
