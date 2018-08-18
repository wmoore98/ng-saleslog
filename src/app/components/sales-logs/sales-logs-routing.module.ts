import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

import { SalesLogsComponent } from './sales-logs.component';
import { SalesLogStartComponent } from './sales-log-start/sales-log-start.component';
import { SalesLogEditComponent } from './sales-log-edit/sales-log-edit.component';
import { SalesLogDetailComponent } from './sales-log-detail/sales-log-detail.component';

const salesLogsRoutes: Routes = [
  { path: 'sales-logs', component: SalesLogsComponent, canActivate: [AuthGuard], children: [
    { path: '', component: SalesLogStartComponent },
    { path: 'new', component: SalesLogEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: SalesLogDetailComponent },
    { path: ':id/edit', component: SalesLogEditComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(salesLogsRoutes)
  ],
  exports: [RouterModule]
})
export class SalesLogsRoutingModule {

}
