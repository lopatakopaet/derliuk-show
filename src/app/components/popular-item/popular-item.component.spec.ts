import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularItemComponent } from './popular-item.component';

describe('PopularItemComponent', () => {
  let component: PopularItemComponent;
  let fixture: ComponentFixture<PopularItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
