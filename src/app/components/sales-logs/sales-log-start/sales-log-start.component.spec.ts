import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogStartComponent } from './sales-log-start.component';

describe('SalesLogStartComponent', () => {
  let component: SalesLogStartComponent;
  let fixture: ComponentFixture<SalesLogStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
