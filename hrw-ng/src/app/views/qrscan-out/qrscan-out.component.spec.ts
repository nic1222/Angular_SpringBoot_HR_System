import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrscanOutComponent } from './qrscan-out.component';

describe('QrscanOutComponent', () => {
  let component: QrscanOutComponent;
  let fixture: ComponentFixture<QrscanOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrscanOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscanOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
