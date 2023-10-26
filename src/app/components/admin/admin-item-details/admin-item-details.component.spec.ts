import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemDetailsComponent } from './admin-item-details.component';

describe('AdminItemDetailsComponent', () => {
  let component: AdminItemDetailsComponent;
  let fixture: ComponentFixture<AdminItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
