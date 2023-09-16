import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCommentComponent } from './slider-comment.component';

describe('SliderComponent', () => {
  let component: SliderCommentComponent;
  let fixture: ComponentFixture<SliderCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
