import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalConstants } from 'app/shared/global-constants';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-table-popup',
  templateUrl: './order-table-popup.component.html',
  styleUrls: ['./order-table-popup.component.scss']
})
export class OrderTablePopupComponent implements OnInit {
  public itemForm: FormGroup;
  public showModifiedInfo: boolean = false;
  public DesignURL: string = '';
  public JsonURL: string = '';
  public ProposalURL: string = '';

  public OrderDetailsId: string = ''

  public processList: string[] = GlobalConstants.allProcessList;
  public statusList: string[] = GlobalConstants.allStatusList;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderTablePopupComponent>,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private crudService: OrderService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {
    var orderDetails = item.OrderDetails[0];

    if (item.ModifiedByName != '') {
      this.showModifiedInfo = true;
    }

    if (orderDetails.DesignURL != '') {
      this.DesignURL = orderDetails.DesignURL;
    }

    if (orderDetails.ProposalURL != '') {
      this.ProposalURL = orderDetails.ProposalURL;
    }

    if (orderDetails.JsonURL != '') {
      this.JsonURL = orderDetails.JsonURL;
    }

    if (item.OrderId != '') {
      this.OrderDetailsId = item.OrderId;
    }

    var tempDate = '';
    if (item.ModifiedOn != undefined) {
      tempDate = this.datepipe.transform(item.ModifiedOn, 'medium');
    }

    this.itemForm = this.fb.group({
      OrderId: [item.OrderId || ''],
      // Status: [item.Status || ''],
      // Process: [item.Process || ''],
      ModifiedByName: [item.ModifiedByName || ''],
      ModifiedOn: [item.ModifiedOn || ''],
      ModifiedInfo: ["Last Modified by " + item.ModifiedByName + " On " + tempDate],
      Notes: [item.Notes || ''],
      Current_Process: [item.Current_Process || ''],
      Current_Status: [item.Current_Status || ''],

      // Line1: [item.Line1 || '', Validators.required],
      // Line2: [item.Line2 || ''],
      // City: [item.City || '',Validators.required],
      // State: [item.State || '',Validators.required],
      // PostalCode: [item.PostalCode || '']
      //Address: [item.Address || ''],
    });
  }

  DownloadFile() {
    if (this.OrderDetailsId !== null) {
      this.crudService.DownloadDesignDocument(this.OrderDetailsId).subscribe(data => {
        const url: string = data as string;
        window.open(url, '_blank');
        //   const pdfName = this.OrderDetailsId;
        //   return this.http.get(url)
        //   .map((response) => {
        //      let blob = new Blob([response], { type: 'application/pdf' });
        //      let url= window.URL.createObjectURL(blob);
        //      window.open(url);
        // });
      });
    }
  }

  DownloadBomFile() {
    if (this.OrderDetailsId !== null) {
      this.crudService.DownloadBomDocument(this.OrderDetailsId).subscribe(data => {
        const url: string = data as string;
        window.open(url, '_blank');
      });
    }
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
