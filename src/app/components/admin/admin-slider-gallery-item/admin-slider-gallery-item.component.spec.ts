import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSliderGalleryItemComponent } from './admin-slider-gallery-item.component';

describe('AdminSliderGalleryItemComponent', () => {
  let component: AdminSliderGalleryItemComponent;
  let fixture: ComponentFixture<AdminSliderGalleryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSliderGalleryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSliderGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
