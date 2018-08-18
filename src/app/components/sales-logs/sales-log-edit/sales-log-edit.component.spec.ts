import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogEditComponent } from './sales-log-edit.component';

describe('SalesLogEditComponent', () => {
  let component: SalesLogEditComponent;
  let fixture: ComponentFixture<SalesLogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
