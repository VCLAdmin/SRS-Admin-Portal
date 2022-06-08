import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Address } from 'app/shared/models/FabricatorApiModel';
import { FabricatorService } from '../../fabricator.service';
import { addressStructure } from 'app/shared/models/addressStructure';
import { AppconstantsService } from 'app/shared/services/appconstants.service';

@Component({
  selector: 'app-fabricator-table-popup',
  templateUrl: './fabricator-table-popup.component.html',
  styleUrls: ['./fabricator-table-popup.component.scss']
})
export class FabricatorTablePopupComponent implements OnInit {
  selectedSRSProductType = [];
  public itemForm: FormGroup;
  supportsADS: boolean = false;
  supportsASS: boolean = false;
  supportsAWS: boolean = false;
  public editing: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FabricatorTablePopupComponent>,
    private fb: FormBuilder,
    private appConstantService: AppconstantsService,
    private crudService: FabricatorService,
  ) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      Name: ['', Validators.required],
      PrimaryContactName: [''],
      PrimaryContactEmail: ['', [Validators.email]],
      PrimaryContactPhone: [''],
      SupportedProductType: ['', Validators.required],
      // SupportsADS: ['', Validators.required],
      // SupportsASS: ['', Validators.required],
      // SupportsAWS: ['', Validators.required],
      Line1: ['', Validators.required],
      Line2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      PostalCode: [''],
      County: ['' || ''],
      Country: ['' || ''],
      Lng: ['' || ''],
      Lat: ['' || '']
      //Address: [item.Address || ''],
    })
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {
    if (item.PrimaryContactEmail != undefined) {
      this.editing = true;
    }

    this.selectedSRSProductType = [];
    if (item.SupportsADS) this.selectedSRSProductType.push('ADS');
    if (item.SupportsAWS) this.selectedSRSProductType.push('AWS');
    if (item.SupportsASS) this.selectedSRSProductType.push('ASS');

    this.itemForm = this.fb.group({
      Name: [item.Name || '', Validators.required],
      PrimaryContactName: [item.PrimaryContactName || ''],
      PrimaryContactEmail: [item.PrimaryContactEmail || '', [
        Validators.email
      ]],
      PrimaryContactPhone: [item.PrimaryContactPhone || ''],
      SupportedProductType: ['', Validators.required],
      // SupportsADS: [item.SupportsADS, Validators.required],
      // SupportsASS: [item.SupportsASS, Validators.required],
      // SupportsAWS: [item.SupportsAWS, Validators.required],
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
    this.googleSearchAddress();
  }

  submit() {
    this.itemForm.value.SupportsADS = this.selectedSRSProductType.indexOf("ADS") > -1 ? 1 : 0;
    this.itemForm.value.SupportsAWS = this.selectedSRSProductType.indexOf("AWS") > -1 ? 1 : 0;
    this.itemForm.value.SupportsASS = this.selectedSRSProductType.indexOf("ASS") > -1 ? 1 : 0;
    this.dialogRef.close(this.itemForm.value)
  }


  _address: Address;
  @ViewChild('addressText') addressText: any;
  autocomplete: google.maps.places.Autocomplete;
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
