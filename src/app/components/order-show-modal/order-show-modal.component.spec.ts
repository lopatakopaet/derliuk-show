import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShowModalComponent } from './order-show-modal.component';

describe('OrderShowModalComponent', () => {
  let component: OrderShowModalComponent;
  let fixture: ComponentFixture<OrderShowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderShowModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderShowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
