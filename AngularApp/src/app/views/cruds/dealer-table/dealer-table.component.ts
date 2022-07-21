import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DealerTablePopupComponent } from './dealer-table-popup/dealer-table-popup.component';
import { DealerService } from '../dealer.service';
import { DealerApiModel } from 'app/shared/models/DealerApiModel';
import { FabricatorService } from '../fabricator.service';
import { FabricatorApiModel } from 'app/shared/models/FabricatorApiModel';
import { BasicSnackbarComponent } from 'app/views/basic-snackbar/basic-snackbar.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dealer-table',
  templateUrl: './dealer-table.component.html',
  styleUrls: ['./dealer-table.component.scss'],
  animations: egretAnimations
})
export class DealerTableComponent implements OnInit, OnDestroy {
  public items: DealerApiModel[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: DealerService,
    private fabricatorService: FabricatorService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.getItems();
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

 /**
 * This function is used to get the list of Dealers
 *
 */
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {

        this.items = data;
      })
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isNew: undefined;
  title: string;
  selectedRow: DealerApiModel = undefined;

 /**
 * This function is used to reset the side nav when user clicks on the dealer
 *
 */
  resetSideNav() {
    this.isNew = undefined;
    this.title = "";
    this.selectedRow = undefined;
  }

 /**
 * This function is used to close the side nav of a selected dealer
 *
 */
  onCloseSideNav(reason: string) {
    this.resetSideNav();
    this.sidenav.close();
  }

 /**
 * This function is used to submit the dealer form data when the user updates the dealer data in the side nav
 *
 * @param {any} res is the dealer form object which needs to submit 
 * 
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
          this.snack.open('Dealer Added!', 'OK', { duration: 4000 })
          this.onCloseSideNav("Dealer Added!");
        })
    } else {
      this.crudService.updateItem(this.selectedRow.DealerGuid, res)
        .subscribe(data => {
          this.items = data;
          this.loader.close();
          this.snack.open('Dealer Updated!', 'OK', { duration: 4000 })
          this.onCloseSideNav("Dealer Updated!");
        })
    }
  }

 /**
 * This function is used to open the dealer side nav when user selects the dealer
 *
 */
  onOpenSideNav(data: any = {}, isNew?) {
    this.isNew = isNew;
    this.title = isNew ? 'Add New Dealer' : 'Update Dealer';
    this.selectedRow = data;
    this.sidenav.open()
  }

 /**
 * This function is called when user clck on the delete icon of any particular dealer from the list.
 * 
 * It deletes the dealer from the list and the db is updated
 *
 * @param {any} row is the selected dealer object which is to delete
 */
  deleteItem(row) {
    this.confirmService.confirm({ message: `Delete ${row.Name}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.canRemoveItem(row).subscribe(returnVal => {
            if (returnVal == true) {

              this.crudService.removeItem(row)
                .subscribe(data => {
                  this.items = data;
                  this.loader.close();
                  this.snack.open('Dealer deleted!', 'OK', { duration: 4000 })
                })
            } else {
              this.loader.close();
              this.snack.openFromComponent(BasicSnackbarComponent, {
                data: 'Dealer Cannot be deleted, please delete the users first!',
                duration: 4000,
                panelClass: 'error'
              });
            }

          });

        }
      })
  }
}
