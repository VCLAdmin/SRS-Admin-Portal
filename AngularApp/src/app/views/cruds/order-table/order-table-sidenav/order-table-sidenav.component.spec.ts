import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTableSidenavComponent } from './order-table-sidenav.component';

describe('OrderTableSidenavComponent', () => {
  let component: OrderTableSidenavComponent;
  let fixture: ComponentFixture<OrderTableSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTableSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTableSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
