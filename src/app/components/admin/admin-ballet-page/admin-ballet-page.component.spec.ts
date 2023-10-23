import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBalletPageComponent } from './admin-ballet-page.component';

describe('AdminBalletPageComponent', () => {
  let component: AdminBalletPageComponent;
  let fixture: ComponentFixture<AdminBalletPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBalletPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBalletPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
