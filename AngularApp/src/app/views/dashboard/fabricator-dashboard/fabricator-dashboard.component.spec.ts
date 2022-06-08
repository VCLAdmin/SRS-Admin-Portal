import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricatorDashboardComponent } from './fabricator-dashboard.component';

describe('FabricatorDashboardComponent', () => {
  let component: FabricatorDashboardComponent;
  let fixture: ComponentFixture<FabricatorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricatorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
