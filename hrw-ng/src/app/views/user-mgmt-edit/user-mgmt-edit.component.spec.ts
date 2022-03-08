import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMgmtEditComponent } from './user-mgmt-edit.component';

describe('UserMgmtEditComponent', () => {
  let component: UserMgmtEditComponent;
  let fixture: ComponentFixture<UserMgmtEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMgmtEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMgmtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
