import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauxComponent } from './bureaux.component';

describe('BureauxComponent', () => {
  let component: BureauxComponent;
  let fixture: ComponentFixture<BureauxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BureauxComponent]
    });
    fixture = TestBed.createComponent(BureauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
