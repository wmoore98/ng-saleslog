import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogItemComponent } from './sales-log-item.component';

describe('SalesLogItemComponent', () => {
  let component: SalesLogItemComponent;
  let fixture: ComponentFixture<SalesLogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
