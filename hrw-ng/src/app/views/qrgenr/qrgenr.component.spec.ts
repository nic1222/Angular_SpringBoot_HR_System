import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrgenrComponent } from './qrgenr.component';

describe('QrgenrComponent', () => {
  let component: QrgenrComponent;
  let fixture: ComponentFixture<QrgenrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrgenrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrgenrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
