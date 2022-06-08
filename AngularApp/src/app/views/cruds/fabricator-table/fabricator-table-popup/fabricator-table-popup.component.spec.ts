import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricatorTablePopupComponent } from './fabricator-table-popup.component';

describe('FabricatorTablePopupComponent', () => {
  let component: FabricatorTablePopupComponent;
  let fixture: ComponentFixture<FabricatorTablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricatorTablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricatorTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
