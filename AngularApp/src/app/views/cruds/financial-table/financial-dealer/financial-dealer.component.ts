import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, EventEmitter, Output } from "@angular/core";
import { Invoice, InvoiceItem } from 'app/shared/models/invoice.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../order.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { OrderApiModel } from 'app/shared/models/OrderApiModel';
import { DealerTableSidenavComponent } from '../../dealer-table/dealer-table-sidenav/dealer-table-sidenav.component';

@Component({
  selector: 'app-financial-dealer',
  templateUrl: './financial-dealer.component.html',
  styleUrls: ['./financial-dealer.component.scss']
})
export class FinancialDealerComponent implements OnInit {
  @Input() public data: OrderApiModel[];
  @Output() onCloseSideNav = new EventEmitter<any>();

  @Input() public parentOrders: OrderApiModel[];
  @Input() public subOrders: OrderApiModel[];
  simpleView = true;
  finalTotal = 0;
  constructor() { }

  ngOnInit() {
    this.parentOrders = this.data.filter(f => f.ParentOrderId == null);
    this.finalTotal = 0;
    this.parentOrders.forEach(element => {
      this.finalTotal += element.Total;
    });
  }
  ngOnDestroy() {

  }
  getItems() {

  }

  unfold_more() {
    this.simpleView = !this.simpleView;
  }
  close(reason: string) {
    this.onCloseSideNav.emit(false);
  }
}
