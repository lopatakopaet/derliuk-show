import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalletShowComponent } from './ballet-show.component';

describe('BalletShowComponent', () => {
  let component: BalletShowComponent;
  let fixture: ComponentFixture<BalletShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalletShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalletShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
