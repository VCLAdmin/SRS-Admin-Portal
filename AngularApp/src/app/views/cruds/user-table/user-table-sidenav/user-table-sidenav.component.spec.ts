import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableSidenavComponent } from './user-table-sidenav.component';

describe('UserTableSidenavComponent', () => {
  let component: UserTableSidenavComponent;
  let fixture: ComponentFixture<UserTableSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTableSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
