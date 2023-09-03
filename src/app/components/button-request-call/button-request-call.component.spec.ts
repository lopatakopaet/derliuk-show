import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRequestCallComponent } from './button-request-call.component';

describe('ButtonRequestCallComponent', () => {
  let component: ButtonRequestCallComponent;
  let fixture: ComponentFixture<ButtonRequestCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRequestCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonRequestCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
