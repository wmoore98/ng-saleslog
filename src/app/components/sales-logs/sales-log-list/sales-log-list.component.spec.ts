import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogListComponent } from './sales-log-list.component';

describe('SalesLogListComponent', () => {
  let component: SalesLogListComponent;
  let fixture: ComponentFixture<SalesLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
