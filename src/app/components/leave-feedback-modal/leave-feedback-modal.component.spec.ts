import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveFeedbackModalComponent } from './leave-feedback-modal.component';

describe('LeaveFeedbackModalComponent', () => {
  let component: LeaveFeedbackModalComponent;
  let fixture: ComponentFixture<LeaveFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveFeedbackModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
