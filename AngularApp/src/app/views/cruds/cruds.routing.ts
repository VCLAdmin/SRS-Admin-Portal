import { Routes } from '@angular/router';
import { FabricatorRoleGuard } from 'app/shared/guards/fabricator-role.guard';
import { UserRoleGuard } from 'app/shared/guards/user-role.guard';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';
import { DealerTableComponent } from './dealer-table/dealer-table.component';
import { FabricatorTableComponent } from './fabricator-table/fabricator-table.component';
import { FinancialTableComponent } from './financial-table/financial-table.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { UserTableComponent } from './user-table/user-table.component';

export const CrudsRoutes: Routes = [
  {
    path: 'ngx-table',
    component: CrudNgxTableComponent,
    data: { title: 'NgX Table', breadcrumb: 'NgX Table' }
  },
  {
    path: 'dealers',
    component: DealerTableComponent,
    canActivate: [UserRoleGuard],
    data: { title: 'Dealers', breadcrumb: 'Dealers' }
  },
  {
    path: 'fabricators',
    component: FabricatorTableComponent,
    canActivate: [UserRoleGuard],
    data: { title: 'Fabricators', breadcrumb: 'Fabricators' }
  },
  {
    path: 'financials',
    component: FinancialTableComponent,
    canActivate: [UserRoleGuard],
    data: { title: 'Financials', breadcrumb: 'Financials' }
  },
  {
    path: 'users',
    component: UserTableComponent,
    canActivate: [UserRoleGuard],
    data: { title: 'Users', breadcrumb: 'Users' }
  },
  {
    path: 'orders',
    component: OrderTableComponent,
    data: { title: 'Orders', breadcrumb: 'Orders' }
  }
];