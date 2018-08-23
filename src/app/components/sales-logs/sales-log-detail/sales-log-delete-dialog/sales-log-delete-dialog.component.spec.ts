import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogDeleteDialogComponent } from './sales-log-delete-dialog.component';

describe('SalesLogDeleteDialogComponent', () => {
  let component: SalesLogDeleteDialogComponent;
  let fixture: ComponentFixture<SalesLogDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
