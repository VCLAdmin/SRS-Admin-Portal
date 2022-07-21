import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, FabricatorApiModel } from 'app/shared/models/FabricatorApiModel';
import { AppconstantsService } from 'app/shared/services/appconstants.service';
import { Subscription } from 'rxjs';
import { FabricatorService } from '../../fabricator.service';
import { addressStructure } from 'app/shared/models/addressStructure';

@Component({
  selector: 'app-dealer-table-sidenav',
  templateUrl: './dealer-table-sidenav.component.html',
  styleUrls: ['./dealer-table-sidenav.component.scss']
})
export class DealerTableSidenavComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public data: any;
  @Input() public title: string;
  @Output() onCloseSideNav = new EventEmitter<any>();
  @Output() onSubmitData = new EventEmitter<any>();

  public itemForm: FormGroup;
  public fabricatorsAWSList: FabricatorApiModel[];
  public fabricatorsADSList: FabricatorApiModel[];
  public fabricatorsASSList: FabricatorApiModel[];
  public editing: boolean = false;
  public getItemSub: Subscription;
  constructor(
    private fb: FormBuilder,
    private fabricatorService: FabricatorService,
    private appConstantService: AppconstantsService,
  ) { }

  ngOnInit() {
    this.buildInitialForm();
  }
  ngOnChanges(Changes: SimpleChanges) {
    if (Changes) {
      if (Changes.data && Changes.data.currentValue) {
        if (this.data) {
          this.buildInitialForm();
        }
      }
    }
  }
 /**
 * This function is used to initiate the dealer form with the default values.
 */
  buildInitialForm() {
    this.itemForm = this.fb.group({
      Name: ['', Validators.required],
      PrimaryContactName: [''],
      PrimaryContactEmail: ['', [Validators.email]],
      PrimaryContactPhone: [''],
      CreditLine: [''],
      AWSFabricatorId: [0, Validators.required],
      ASSFabricatorId: [0, Validators.required],
      ADSFabricatorId: [0, Validators.required],
      DefaultSalesTax: [''],
      Line1: ['', Validators.required],
      Line2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      PostalCode: ['']
    })
    this.buildItemForm(this.data);
    this.getItemSub = this.fabricatorService.getItems()
      .subscribe(dataFabricators => {
        this.fabricatorsADSList = dataFabricators.filter(f => f.SupportsADS === 1);
        this.fabricatorsASSList = dataFabricators.filter(f => f.SupportsASS === 1);
        this.fabricatorsAWSList = dataFabricators.filter(f => f.SupportsAWS === 1);
      });
    this.googleSearchAddress();
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

 /**
 * This function is used to initialize the dealer form with the selected dealer details
 * 
 * @param {any} item is the dealer object which has the selected dealer details.
 */
  buildItemForm(item) {
    if (item.PrimaryContactEmail != undefined) {
      this.editing = true;

      this.itemForm = this.fb.group({
        Name: [item.Name || '', Validators.required],
        PrimaryContactName: [item.PrimaryContactName || ''],
        PrimaryContactEmail: [item.PrimaryContactEmail || '', [
          Validators.email
        ]],
        PrimaryContactPhone: [item.PrimaryContactPhone || ''],

        AWSFabricatorId: [item.AWSFabricatorId, Validators.required],
        ASSFabricatorId: [item.ASSFabricatorId, Validators.required],
        ADSFabricatorId: [item.ADSFabricatorId, Validators.required],

        CreditLine: [item.CreditLine.toFixed(2) || ''],
        FabricatorId: [item.FabricatorId || ''],
        DefaultSalesTax: [item.DefaultSalesTax || ''],

        Line1: [item.Line1 || '', Validators.required],
        Line2: [item.Line2 || ''],
        City: [item.City || '', Validators.required],
        State: [item.State || '', Validators.required],
        PostalCode: [item.PostalCode || ''],
        County: [item.County || ''],
        Country: [item.Country || ''],
        Lng: [item.Lng || ''],
        Lat: [item.Lat || '']
        //Address: [item.Address || ''],
      })
    }
  }

 /**
 * This function is called when user changes the fabricator in the dealer form
 * 
 * @param {any} event is the fabricator object which is selected by the user in the dealer form.
 */
  ChangeFabricator(event: any) {
    if (event.isUserInput && event.source.selected) {
      //this.getProductTypeList(event.source.value);
    }
  }

 /**
 * This function has the output event emitter to submit the form data in the parent component.
 * 
 * it submits the form data which was edited by the user.
 */
  submit() {
    this.onSubmitData.emit(this.itemForm.value);
  }

 /**
 * This function has the output event emitter to close the side nav of selected dealer.
 * 
 * it closes the selected dealer side nav which has the dealer details.
 */
  close(reason: string) {
    this.onCloseSideNav.emit(false);
  }


  _address: Address;
  @ViewChild('addressText') addressText: any;
  autocomplete: google.maps.places.Autocomplete;

 /**
 * This function is used to search the address using google address api to enter the address for dealer.
 * 
 */
  googleSearchAddress() {
    this.showGoogleMap = false;
    const self = this;
    const googleUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + this.appConstantService.GOOGLE_API_KEY;
    if (!document.querySelectorAll(`[src="${googleUrl}"]`).length) {
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
        type: 'text/javascript',
        src: googleUrl,
        onload: () => self.getPlaceAutocomplete()
      }));
    } else {
      self.getPlaceAutocomplete();
    }
    const addressSearch = document.getElementsByClassName('address-search-input');
    if (addressSearch.length > 0) {
      (addressSearch[0] as HTMLElement).focus();
    }
  }

 /**
 * This function is used to get the google address auto complete in which the google returned address is mapped to the
 * 
 * form fields which was there in the dealer form.
 * 
 */
  private getPlaceAutocomplete(): void {
    setTimeout(() => {
      if (this.addressText) {
        const autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement,
          {
            types: ['geocode', 'establishment']
          });

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          this.showGoogleMap = true;
          this._address = <Address>{};
          for (let i = 0; i < place.address_components!.length; i++) {
            const addressType = place.address_components![i].types[0];
            if ((addressStructure as any)[addressType]) {
              const val = (place.address_components![i] as any)[(addressStructure as any)[addressType]];
              if (val !== undefined) {
                if (addressType === 'sublocality_level_1') { this._address.Line2 = val; }
                // tslint:disable-next-line: one-line
                else if (addressType === 'country') { this._address.Country = val; }
                // tslint:disable-next-line: one-line
                else if (addressType === 'locality') { this._address.City = val; }
                // tslint:disable-next-line: one-line
                else if (addressType === 'administrative_area_level_1') { this._address.State = val; }
                // tslint:disable-next-line: one-line
                else if (addressType === 'administrative_area_level_2') { this._address.County = val; }
                // tslint:disable-next-line: one-line
                else if (addressType === 'postal_code') { this._address.PostalCode = val; }
              }
            }
          }
          // Line1 was missing
          this._address.Latitude = place.geometry.location.lat();
          this._address.Longitude = place.geometry.location.lng();
          this._address.Line1 = place.name;
          this.onAddressAutocomplete(this._address);
          //this.initMap();
        });
      }
    }, 500);
  }
  showGoogleMap: boolean = false;
  // @ViewChild('gmap') gmap: any;
  // initMap() {
  //   this.showGoogleMap = true;
  //   console.log(this._address.Latitude, this._address.Longitude);
  //   const that = this;
  //   if (that._address && that.gmap.nativeElement) {
  //     var latlng = new google.maps.LatLng(that._address.Latitude ? that._address.Latitude : 28.5355161, that._address.Longitude ? that._address.Longitude : 77.39102649999995);
  //     var map = new google.maps.Map(that.gmap.nativeElement, {
  //       center: latlng,
  //       zoom: 16
  //     });
  //     console.log(latlng);
  //     var marker = new google.maps.Marker({
  //       map: map,
  //       position: latlng,
  //       draggable: true,
  //       anchorPoint: new google.maps.Point(0, -29)
  //     });
  //     // this function will work on marker move event into map 
  //     google.maps.event.addListener(marker, 'dragend', function () {
  //       that._address.Latitude = marker.getPosition()?.lat();
  //       that._address.Longitude = marker.getPosition()?.lng();
  //       console.log(marker.getPosition()?.lat(), marker.getPosition()?.lng())
  //       that.onAddressAutocomplete(that._address);
  //       //that.graphAddress(marker);
  //     });
  //     // this.calculateAndDisplayRoute({
  //     //   lat: that._address.Lat,
  //     //   lng: that._address.Lng
  //     // });
  //   }
  // }
  // graphAddress(marker: any) {
  //   var geocoder = new google.maps.Geocoder();
  //   var pointer = marker.getPosition();

  //   geocoder.geocode({ 'location': marker.latlng }, function (results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       if (results[0]) {
  //         //console.log(results[0].geometry.location.lat().toFixed(6), results[0].geometry.location.lng().toFixed(6));
  //         //map.setCenter(results[0].geometry.location);
  //         //infowindow.setContent(results[0].formatted_address);
  //         //infowindow.open(map, marker);
  //       }
  //     }
  //   });
  // }

 /**
 * This function is used to set the address fields of the form.
 * 
 */
  onAddressAutocomplete(event: Address): void {
    this.itemForm.controls.Line1.setValue(event.Line1);
    this.itemForm.controls.Line2.setValue(event.Line2);
    this.itemForm.controls.City.setValue(event.City);
    this.itemForm.controls.State.setValue(event.State);
    this.itemForm.controls.PostalCode.setValue(event.PostalCode);
    this.itemForm.controls.County.setValue(event.County);
    this.itemForm.controls.Country.setValue(event.Country);
    this.itemForm.controls.Lng.setValue(event.Longitude);
    this.itemForm.controls.Lat.setValue(event.Latitude);
    setTimeout(() => {
      this._address = event;
    }, 10);
  }
}
