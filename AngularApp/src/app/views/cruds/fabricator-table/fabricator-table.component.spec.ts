import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricatorTableComponent } from './fabricator-table.component';

describe('FabricatorTableComponent', () => {
  let component: FabricatorTableComponent;
  let fixture: ComponentFixture<FabricatorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricatorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricatorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
