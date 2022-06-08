import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTablePopupComponent } from './order-table-popup.component';

describe('OrderTablePopupComponent', () => {
  let component: OrderTablePopupComponent;
  let fixture: ComponentFixture<OrderTablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
