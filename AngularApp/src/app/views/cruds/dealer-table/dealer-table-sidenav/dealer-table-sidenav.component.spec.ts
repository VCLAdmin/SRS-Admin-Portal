import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTableSidenavComponent } from './dealer-table-sidenav.component';

describe('DealerTableSidenavComponent', () => {
  let component: DealerTableSidenavComponent;
  let fixture: ComponentFixture<DealerTableSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerTableSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerTableSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
