import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccursaleComponent } from './succursale.component';

describe('SuccursaleComponent', () => {
  let component: SuccursaleComponent;
  let fixture: ComponentFixture<SuccursaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccursaleComponent]
    });
    fixture = TestBed.createComponent(SuccursaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
