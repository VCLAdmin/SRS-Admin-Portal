import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTableComponent } from './dealer-table.component';

describe('DealerTableComponent', () => {
  let component: DealerTableComponent;
  let fixture: ComponentFixture<DealerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
