import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricatorTableSidenavComponent } from './fabricator-table-sidenav.component';

describe('FabricatorTableSidenavComponent', () => {
  let component: FabricatorTableSidenavComponent;
  let fixture: ComponentFixture<FabricatorTableSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricatorTableSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricatorTableSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
