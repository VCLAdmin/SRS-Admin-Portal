import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialTablePopupComponent } from './financial-table-popup.component';

describe('FinancialTablePopupComponent', () => {
  let component: FinancialTablePopupComponent;
  let fixture: ComponentFixture<FinancialTablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialTablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
