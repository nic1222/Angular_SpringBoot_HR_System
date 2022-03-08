import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMgmtAddComponent } from './user-mgmt-add.component';

describe('UserMgmtAddComponent', () => {
  let component: UserMgmtAddComponent;
  let fixture: ComponentFixture<UserMgmtAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMgmtAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMgmtAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
