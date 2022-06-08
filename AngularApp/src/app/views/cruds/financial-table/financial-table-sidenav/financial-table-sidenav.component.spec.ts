import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialTableSidenavComponent } from './financial-table-sidenav.component';

describe('FinancialTableSidenavComponent', () => {
  let component: FinancialTableSidenavComponent;
  let fixture: ComponentFixture<FinancialTableSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialTableSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialTableSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
