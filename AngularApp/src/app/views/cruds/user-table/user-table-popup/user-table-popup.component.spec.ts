import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTablePopupComponent } from './user-table-popup.component';

describe('UserTablePopupComponent', () => {
  let component: UserTablePopupComponent;
  let fixture: ComponentFixture<UserTablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
