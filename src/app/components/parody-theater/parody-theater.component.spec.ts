import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParodyTheaterComponent } from './parody-theater.component';

describe('ParodyTheaterComponent', () => {
  let component: ParodyTheaterComponent;
  let fixture: ComponentFixture<ParodyTheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParodyTheaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParodyTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
