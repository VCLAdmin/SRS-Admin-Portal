import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDealerComponent } from './financial-dealer.component';

describe('FinancialDealerComponent', () => {
  let component: FinancialDealerComponent;
  let fixture: ComponentFixture<FinancialDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
