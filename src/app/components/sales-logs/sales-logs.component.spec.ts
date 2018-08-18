import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogsComponent } from './sales-logs.component';

describe('SalesLogsComponent', () => {
  let component: SalesLogsComponent;
  let fixture: ComponentFixture<SalesLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
