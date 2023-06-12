import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondanceComponent } from './correspondance.component';

describe('CorrespondanceComponent', () => {
  let component: CorrespondanceComponent;
  let fixture: ComponentFixture<CorrespondanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrespondanceComponent]
    });
    fixture = TestBed.createComponent(CorrespondanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
