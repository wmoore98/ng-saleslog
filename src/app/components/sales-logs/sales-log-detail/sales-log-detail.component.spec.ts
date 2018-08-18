import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogDetailComponent } from './sales-log-detail.component';

describe('SalesLogDetailComponent', () => {
  let component: SalesLogDetailComponent;
  let fixture: ComponentFixture<SalesLogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
