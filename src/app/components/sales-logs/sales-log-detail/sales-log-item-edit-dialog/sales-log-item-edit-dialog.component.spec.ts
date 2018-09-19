import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogItemEditDialogComponent } from './sales-log-item-edit-dialog.component';

describe('SalesLogItemEditDialogComponent', () => {
  let component: SalesLogItemEditDialogComponent;
  let fixture: ComponentFixture<SalesLogItemEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogItemEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogItemEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
