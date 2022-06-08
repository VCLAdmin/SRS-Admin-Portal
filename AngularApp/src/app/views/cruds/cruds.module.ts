import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';

import { CrudsRoutes } from './cruds.routing';
import { CrudService } from './crud.service';
import { DealerService } from './dealer.service';
import { FabricatorService } from './fabricator.service';
import { OrderService } from './order.service';
import { NgxTablePopupComponent } from './crud-ngx-table/ngx-table-popup/ngx-table-popup.component'
import { TranslateModule } from '@ngx-translate/core';
import { DealerTableComponent } from './dealer-table/dealer-table.component';
import { DealerTablePopupComponent } from './dealer-table/dealer-table-popup/dealer-table-popup.component';
import { FabricatorTableComponent } from './fabricator-table/fabricator-table.component';
import { FabricatorTablePopupComponent } from './fabricator-table/fabricator-table-popup/fabricator-table-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { UserTableComponent } from './user-table/user-table.component';
import { UserTablePopupComponent } from './user-table/user-table-popup/user-table-popup.component';
import { SRSUserService } from './srsuser.service';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderTablePopupComponent } from './order-table/order-table-popup/order-table-popup.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { FinancialTableComponent } from './financial-table/financial-table.component';
import { FinancialTablePopupComponent } from './financial-table/financial-table-popup/financial-table-popup.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserTableSidenavComponent } from './user-table/user-table-sidenav/user-table-sidenav.component';
import { OrderTableSidenavComponent } from './order-table/order-table-sidenav/order-table-sidenav.component';
import { FinancialTableSidenavComponent } from './financial-table/financial-table-sidenav/financial-table-sidenav.component';
import { FabricatorTableSidenavComponent } from './fabricator-table/fabricator-table-sidenav/fabricator-table-sidenav.component';
import { DealerTableSidenavComponent } from './dealer-table/dealer-table-sidenav/dealer-table-sidenav.component';
import { FinancialDealerComponent } from './financial-table/financial-dealer/financial-dealer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    TranslateModule,
    SharedModule,
    MatSidenavModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(CrudsRoutes)
  ],
  declarations: [CrudNgxTableComponent, NgxTablePopupComponent, DealerTableComponent, DealerTablePopupComponent, FabricatorTableComponent, FabricatorTablePopupComponent, UserTableComponent, UserTablePopupComponent, OrderTableComponent, OrderTablePopupComponent, FinancialTableComponent, FinancialTablePopupComponent, UserTableSidenavComponent, OrderTableSidenavComponent, FinancialTableSidenavComponent, FabricatorTableSidenavComponent, DealerTableSidenavComponent, FinancialDealerComponent],
  providers: [CrudService, DealerService, FabricatorService, SRSUserService, OrderService],
  // entryComponents: [NgxTablePopupComponent]
})
export class CrudsModule { }
