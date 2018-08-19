import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogItemEditComponent } from './old-sales-log-item-edit.component';

describe('SalesLogItemEditComponent', () => {
  let component: SalesLogItemEditComponent;
  let fixture: ComponentFixture<SalesLogItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
