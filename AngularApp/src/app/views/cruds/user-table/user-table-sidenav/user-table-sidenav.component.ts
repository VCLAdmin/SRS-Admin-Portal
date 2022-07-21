import { Component, OnInit, Inject, OnDestroy, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { SRSUserApiModel } from 'app/shared/models/SRSUserApiModel';
import { SRSUserService } from '../../srsuser.service';
import { Observable, Subscription } from 'rxjs';
import { FabricatorService } from '../../fabricator.service';
import { FabricatorApiModel } from 'app/shared/models/FabricatorApiModel';
import { ThemePalette } from '@angular/material/core';
import { DealerApiModel } from 'app/shared/models/DealerApiModel';
import { DealerService } from '../../dealer.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-table-sidenav',
  templateUrl: './user-table-sidenav.component.html',
  styleUrls: ['./user-table-sidenav.component.scss']
})
export class UserTableSidenavComponent implements OnInit, OnDestroy, OnChanges {
  hide = true;
  @Input() public data: any;
  @Input() public title: string;
  @Output() onCloseSideNav = new EventEmitter<any>();
  @Output() onSubmitData = new EventEmitter<any>();
  // @Output() returnData = new EventEmitter<any>();

  public togglecolor: ThemePalette = 'primary';
  public selectedRow: SRSUserApiModel;
  public itemForm: FormGroup;
  public isDealer: boolean;
  public updation: boolean;
  public toggleInfo: string;
  public allFabricators: FabricatorApiModel[];
  public allDealers: DealerApiModel[];
  public allDealerRoles: string[] = ['Full', 'Restricted'];
  public allFabRoles: string[] = ['Full'];
  public getItemSub: Subscription;
  public editing: boolean = false;
  public userGuid: string = '';

  public getDealerSub: Subscription;
  constructor(
    private fb: FormBuilder,
    private fabricatorService: FabricatorService,
    private dealerService: DealerService,
    private srsUserService: SRSUserService) { }

  ngOnInit(): void {
    this.getItemSub = this.fabricatorService.getItems()
      .subscribe(data => {
        this.allFabricators = data;
      })
    this.getDealerSub = this.dealerService.getItems()
      .subscribe(data => {
        this.allDealers = data;
      })
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
    if (this.getDealerSub) {
      this.getDealerSub.unsubscribe()
    }
  }

  ngOnChanges(Changes: SimpleChanges) {
    if (Changes) {
      if (Changes.data && Changes.data.currentValue) {
        if (this.data) {
          if (this.data.FabricatorId || this.data.DealerId) {
            this.updation = true;
            if (this.data.FabricatorId == 0) this.isDealer = true;
            else this.isDealer = false;

            if (this.isDealer) {
              this.toggleInfo = "Dealer";
            }
            else
              this.toggleInfo = "Fabricator";

            this.buildItemForm(this.data, this.isDealer);
          } else {
            this.updation = false;
            this.isDealer = false;
            this.toggle();
          }
        }
      }
    }
  }

 /**
 * This function is called when the user switch on and off of user type Dealer.
 * 
 */
  public toggle() {
    this.isDealer = !this.isDealer;
    if (this.isDealer) {
      this.toggleInfo = "Dealer";
    }
    else
      this.toggleInfo = "Fabricator";
    this.buildItemForm(this.data, this.isDealer);
  }

 /**
 * This function is used to initialize the user form with the selected user details
 * 
 * @param {any} item is the user object which has the selected user details.
 * 
 * @param {boolean} isDealer is the boolean value which gives the information whether user is saved as dealer or fabricator.
 * 
 */
  buildItemForm(item, isDealer) {
    if (item.Email != undefined) {
      this.editing = true;
      this.userGuid = item.UserGuid;
    } else {
      this.editing = false;
      this.userGuid = '';
    }
    if (isDealer) {
      this.itemForm = this.fb.group({
        NameFirst: [item.NameFirst || '', Validators.required],
        NameLast: [item.NameLast || '', Validators.required],
        Email: this.itemFormEmail(item),
        FabricatorId: [item.FabricatorId || ''],
        DealerId: [item.DealerId || '', Validators.required],
        UserRole: [item.UserRole || 'Full'],
        Password: [item.Password || '', Validators.required]
      })
    } else {
      this.itemForm = this.fb.group({
        NameFirst: [item.NameFirst || '', Validators.required],
        NameLast: [item.NameLast || '', Validators.required],
        Email: this.itemFormEmail(item),
        FabricatorId: [item.FabricatorId || '', Validators.required],
        DealerId: [item.DealerId || ''],
        UserRole: [item.UserRole || 'Full'],
        Password: [item.Password || '', Validators.required]
      })
    }
  }

 /**
 * This function is used to get the email of the selected user.
 * 
 * @param {any} item is the selected user object 
 * 
 */
  itemFormEmail(item: any) {
    if (this.updation)
      return [item.Email];
    else
      return [item.Email || '', [Validators.required, Validators.email], this.validateNameViaServer.bind(this)];
  }

 /**
 * This function is used to validate the user name using server.
 * 
 * @param {any} value is the selected user object 
 * 
 */  
  validateNameViaServer({ value }: AbstractControl): Observable<ValidationErrors | null> {
    return this.srsUserService.isEmailDuplicate(value)
      .pipe(debounceTime(1000), map((nameExists: boolean) => {
        if (!nameExists) {
          return {
            isExists: true
          };
        }
        return null;
      }));
  }

 /**
 * This function has the output event emitter to close the side nav of selected user.
 * 
 * it closes the selected user side nav which has the user details.
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
    this.onSubmitData.emit({ dataInfo: this.itemForm.value, isDealer: this.isDealer });
  }
}
