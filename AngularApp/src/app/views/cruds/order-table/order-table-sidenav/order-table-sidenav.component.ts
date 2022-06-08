import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalConstants } from 'app/shared/global-constants';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-order-table-sidenav',
  templateUrl: './order-table-sidenav.component.html',
  styleUrls: ['./order-table-sidenav.component.scss']
})
export class OrderTableSidenavComponent implements OnInit, OnChanges {
  @Input() public data: any;
  @Input() public title: string;
  @Output() onCloseSideNav = new EventEmitter<any>();
  @Output() onSubmitData = new EventEmitter<any>();

  public itemForm: FormGroup;
  public showModifiedInfo: boolean = false;
  public DesignURL: string = '';
  public BomURL: string = '';
  public JsonURL: string = '';
  public ProposalURL: string = '';
  public OrderDetailsId: string = ''
  public processList: string[] = GlobalConstants.allProcessList;
  public statusList: string[] = GlobalConstants.allStatusList;
  public AddressType: string = '';
  public ToAddressInfo: string = '';
  public FromAddressInfo: string = '';
  public ShippingMethod: string = '';

  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private crudService: OrderService
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data);
  }

  ngOnChanges(Changes: SimpleChanges) {
    if (Changes) {
      if (Changes.data && Changes.data.currentValue) {
        if (this.data) {
          this.buildItemForm(this.data);
        }
      }
    }
  }

  getFormattedAddress(add: any): string {
    return (add.Line1 === null || add.Line1 === undefined ? '' : add.Line1 + ', ') +
      (add.Line2 === null || add.Line2 === undefined ? '' : add.Line2 + ', ') +
      (add.City === null || add.City === undefined ? '' : add.City + ', ') +
      (add.State === null || add.State === undefined ? '' : add.State + ' - ') +
      (add.PostalCode === null || add.PostalCode === undefined ? '' : add.PostalCode + ' ') +
      (add.Country === null || add.Country === undefined ? '' : add.Country + ', ') +
      (add.County === null || add.County === undefined ? '' : add.County);
  }
  buildItemForm(item) {
    this.ShippingMethod = item.ShippingMethod ? 'STL - Shared Truckload' : 'TL - Truckload';
    this.AddressType = item.AddressType === 'STORE' ? 'Store' : 'Address';
    this.ToAddressInfo = this.getFormattedAddress(item);
    this.FromAddressInfo = item.FromAddress;
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
    if (orderDetails.BomURL != '') {
      this.BomURL = orderDetails.BomURL;
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
      OrderNumber: [item?.ProjectId + "-" + item?.OrderDetails[0].ProductId || ''],
      // Status: [item.Status || ''],
      // Process: [item.Process || ''],
      ModifiedByName: [item.ModifiedByName || ''],
      ModifiedOn: [item.ModifiedOn || ''],
      ModifiedInfo: [tempDate],
      Notes: [item.Notes || ''],

      Current_Process: [item.Current_Process || ''],
      Current_Status: [item.Current_Status || ''],
    });


  }

  DownloadFile() {
    if (this.OrderDetailsId !== null) {
      this.crudService.DownloadDesignDocument(this.OrderDetailsId).subscribe(data => {
        const url: string = data as string;
        window.open(url, '_blank');
      });
    }
  }
  DownloadBomFile() {
    if (this.OrderDetailsId !== null) {
      console.log(this.data);
      this.crudService.GetProposalFile(this.data.OrderDetails[0].ProductGuid, "BOM").subscribe(result => {
        let blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let url1 = window.URL.createObjectURL(blob);
        window.open(url1);
      });
      // this.crudService.DownloadBomDocument(this.OrderDetailsId).subscribe(data => {
      //   const url: string = data as string;
      //   window.open(url, '_blank');
      // });
    }
  }

  close(reason: string) {
    this.onCloseSideNav.emit(false);
  }

  submit() {
    this.onSubmitData.emit(this.itemForm.value);
  }

}
