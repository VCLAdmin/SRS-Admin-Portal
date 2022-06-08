import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Address, FabricatorApiModel } from 'app/shared/models/FabricatorApiModel';
import { addressStructure } from 'app/shared/models/addressStructure';
import { FabricatorService } from '../../fabricator.service';
import { Subscription } from 'rxjs';
//import { } from 'googlemaps';
import { AppconstantsService } from 'app/shared/services/appconstants.service';

@Component({
  selector: 'app-financial-table-popup',
  templateUrl: './financial-table-popup.component.html',
  styleUrls: ['./financial-table-popup.component.scss']
})
export class FinancialTablePopupComponent implements OnInit, OnDestroy {
  public itemForm: FormGroup;
  public editing: boolean = false;
  public getItemSub: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FinancialTablePopupComponent>,
    private fb: FormBuilder,
    private fabricatorService: FabricatorService,
    private appConstantService: AppconstantsService,
    private crudService: FabricatorService,
  ) { }

  ngOnInit() {

    this.itemForm = this.fb.group({
      DealerName: ['', Validators.required],
      LineOfCredit: [0, Validators.required],
      OrdersToDate: [0, Validators.required],
      PaidToDate: [0, Validators.required],
      CurrentBalance: [0, Validators.required],

    })
    this.buildItemForm(this.data.payload);
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  buildItemForm(item) {
    if (item.PrimaryContactEmail != undefined) {
      this.editing = true;
    }

    this.itemForm = this.fb.group({
      DealerName: [item.DealerName || '', Validators.required],
      LineOfCredit: [item.LineOfCredit || 0, Validators.required],
      OrdersToDate: [item.OrdersToDate || 0, Validators.required],
      PaidToDate: [item.PaidToDate || 0, Validators.required],
      CurrentBalance: [item.CurrentBalance || 0, Validators.required]
    })
  }
  ChangeFabricator(event: any) {
    if (event.isUserInput && event.source.selected) {
      //this.getProductTypeList(event.source.value);
    }
  }
  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}