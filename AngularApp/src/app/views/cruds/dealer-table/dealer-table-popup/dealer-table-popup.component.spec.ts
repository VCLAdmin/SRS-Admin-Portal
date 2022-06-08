import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTablePopupComponent } from './dealer-table-popup.component';

describe('DealerTablePopupComponent', () => {
  let component: DealerTablePopupComponent;
  let fixture: ComponentFixture<DealerTablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerTablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
