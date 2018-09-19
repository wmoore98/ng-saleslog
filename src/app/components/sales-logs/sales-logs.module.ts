import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { SalesLogsComponent } from './sales-logs.component';
import { SalesLogStartComponent } from './sales-log-start/sales-log-start.component';
import { SalesLogListComponent } from './sales-log-list/sales-log-list.component';
import { SalesLogItemComponent } from './sales-log-list/sales-log-item/sales-log-item.component';
import { SalesLogDetailComponent } from './sales-log-detail/sales-log-detail.component';
import { SalesLogEditComponent } from './sales-log-edit/sales-log-edit.component';

import { SalesLogsRoutingModule } from './sales-logs-routing.module';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IdToDescriptionPipe } from './shared/idToDescription.pipe';
import { SalesLogItemEditComponent } from './sales-log-edit/sales-log-item-edit/sales-log-item-edit.component';
import { SalesLogDeleteDialogComponent } from './sales-log-detail/sales-log-delete-dialog/sales-log-delete-dialog.component';
import { SalesLogItemEditDialogComponent } from './sales-log-detail/sales-log-item-edit-dialog/sales-log-item-edit-dialog.component';

@NgModule({
  declarations: [
    SalesLogsComponent,
    SalesLogStartComponent,
    SalesLogListComponent,
    SalesLogItemComponent,
    SalesLogDetailComponent,
    SalesLogEditComponent,
    IdToDescriptionPipe,
    SalesLogItemEditComponent,
    SalesLogDeleteDialogComponent,
    SalesLogItemEditDialogComponent
  ],
  entryComponents: [
    SalesLogDeleteDialogComponent,
    SalesLogItemEditDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    SalesLogsRoutingModule
  ],
  providers: [ IdToDescriptionPipe ]
})

export class SalesLogsModule {

}
