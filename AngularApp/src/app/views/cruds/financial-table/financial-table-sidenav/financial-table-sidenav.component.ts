import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppconstantsService } from 'app/shared/services/appconstants.service';
import { Subscription } from 'rxjs';
import { FabricatorService } from '../../fabricator.service';
import formatCurrencyInput from 'format-currency-input'

@Component({
  selector: 'app-financial-table-sidenav',
  templateUrl: './financial-table-sidenav.component.html',
  styleUrls: ['./financial-table-sidenav.component.scss']
})
export class FinancialTableSidenavComponent implements OnInit, OnChanges {
  @Input() public data: any;
  @Input() public title: string;
  @Output() onCloseSideNav = new EventEmitter<any>();
  @Output() onSubmitData = new EventEmitter<any>();

  public itemForm: FormGroup;
  public editing: boolean = false;
  public getItemSub: Subscription;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      DealerName: ['', Validators.required],
      LineOfCredit: [0, Validators.required],
      OrdersToDate: [0, Validators.required],
      PaidToDate: [0, Validators.required],
      CurrentBalance: [0, Validators.required],
    })
    this.buildItemForm(this.data);
  }

  ngOnChanges(Changes: SimpleChanges) {
    if (Changes) {
      if (Changes.data && Changes.data.currentValue) {
        if (this.data) {
          this.itemForm = this.fb.group({
            DealerName: ['', Validators.required],
            LineOfCredit: [0, Validators.required],
            OrdersToDate: [0, Validators.required],
            PaidToDate: [0, Validators.required],
            CurrentBalance: [0, Validators.required],
          })
          this.buildItemForm(this.data.payload);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

 /**
 * This function is used to initialize the financial form with the selected financial details
 * 
 * @param {any} item is the financial object which has the selected financial details.
 */
  buildItemForm(item) {
    if (item.PrimaryContactEmail != undefined) {
      this.editing = true;
    }

 
    this.itemForm = this.fb.group({
      DealerName: [item.DealerName || '', Validators.required],
      LineOfCredit: [formatCurrencyInput.format(item.LineOfCredit.toFixed(2)) || 0, Validators.required],
      OrdersToDate: [formatCurrencyInput.format(item.OrdersToDate.toFixed(2)) || 0, Validators.required],
      PaidToDate: [formatCurrencyInput.format(item.PaidToDate.toFixed(2)) || 0, Validators.required],
      CurrentBalance: [formatCurrencyInput.format(item.CurrentBalance.toFixed(2)) || 0, Validators.required]
    })
  }

 /**
 * This function has the output event emitter to close the side nav of selected financial.
 * 
 * it closes the selected financial side nav which has the financial details.
 */
  close(reason: string) {
    this.onCloseSideNav.emit(false);
  }

 /**
 * This function has the output event emitter to submit the form data in the parent component.
 * 
 * it submits the form data which was edited by the user.
 */
  submit() {
    this.itemForm.value.LineOfCredit = Number(formatCurrencyInput.format(this.itemForm.value.LineOfCredit, { removeSymbol: true, removeCents: true }));
    this.itemForm.value.OrdersToDate = Number(formatCurrencyInput.format(this.itemForm.value.OrdersToDate, { removeSymbol: true, removeCents: true }));
    this.itemForm.value.PaidToDate = Number(formatCurrencyInput.format(this.itemForm.value.PaidToDate, { removeSymbol: true, removeCents: true }));
    this.itemForm.value.CurrentBalance = Number(formatCurrencyInput.format(this.itemForm.value.CurrentBalance, { removeSymbol: true, removeCents: true }));
    this.onSubmitData.emit(this.itemForm.value);
  }

 /**
 * This function is used to validate to enetr only numbers.
 * 
 */
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
   ; if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
