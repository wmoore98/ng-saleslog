import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    HomeComponent,
    MainNavComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    LayoutModule,
    MaterialModule
  ],
  exports: [
    MainNavComponent
  ]
})
export class CoreModule {}
