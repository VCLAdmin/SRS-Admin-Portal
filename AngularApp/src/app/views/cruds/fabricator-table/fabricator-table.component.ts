import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { FabricatorService } from '../fabricator.service';
import { FabricatorApiModel } from 'app/shared/models/FabricatorApiModel';
import { BasicSnackbarComponent } from 'app/views/basic-snackbar/basic-snackbar.component';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-fabricator-table',
  templateUrl: './fabricator-table.component.html',
  styleUrls: ['./fabricator-table.component.scss'],
  animations: egretAnimations
})
export class FabricatorTableComponent implements OnInit, OnDestroy {
  public items: FabricatorApiModel[];
  public getItemSub: Subscription;
  constructor(
    private snack: MatSnackBar,
    private crudService: FabricatorService,
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
 * This function is used to get the list of Fabricators
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
  selectedRow: FabricatorApiModel = undefined;

 /**
 * This function is used to reset the side nav when user clicks on the fabricator
 *
 */
  resetSideNav() {
    this.isNew = undefined;
    this.title = "";
    this.selectedRow = undefined;
  }

 /**
 * This function is used to close the side nav of a selected fabricator
 *
 */
  onCloseSideNav(reason: string) {
    this.resetSideNav();
    this.sidenav.close();
  }

 /**
 * This function is used to submit the fabricator form data when the user updates the fabricator data in the side nav
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
          this.snack.open('Fabricator Added!', 'OK', { duration: 4000 });
          this.onCloseSideNav("Fabricator Added!");
        })
    } else {
      this.crudService.validateUpdate(this.selectedRow.FabricatorGuid, res)
        .subscribe(dataValid => {
          if (dataValid === "") {
            this.crudService.updateItem(this.selectedRow.FabricatorGuid, res)
              .subscribe(data => {
                this.items = data;
                this.loader.close();
                this.snack.open('Fabricator Updated!', 'OK', { duration: 4000 });
                this.onCloseSideNav("Fabricator Updated!");
              })
          } else {
            this.loader.close();
            this.snack.openFromComponent(BasicSnackbarComponent, {
              data: dataValid,
              duration: 4000,
              panelClass: 'error'
            });
            this.onCloseSideNav("error!");
          }
        })
    }
  }

 /**
 * This function is used to open the fabricator side nav when user selects the fabricator
 *
 */
  onOpenSideNav(data: any = {}, isNew?) {
    this.isNew = isNew;
    this.title = isNew ? 'Add New Fabricator' : 'Update Fabricator';
    this.selectedRow = data;
    this.sidenav.open()
  }

 /**
 * This function is called when user clck on the delete icon of any particular fabricator from the list.
 * 
 * It deletes the fabricator from the list and the db is updated
 *
 * @param {any} row is the selected fabricator object which is to delete
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
                  this.snack.open('Fabricator deleted!', 'OK', { duration: 4000 })
                })
            } else {
              this.loader.close();
              this.snack.openFromComponent(BasicSnackbarComponent, {
                data: 'Fabricator Cannot be deleted, please delete the users first!',
                duration: 4000,
                panelClass: 'error'
              });
            }

          });

        }
      })
  }
}
