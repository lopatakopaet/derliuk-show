import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-order-show-modal',
  templateUrl: './order-show-modal.component.html',
  styleUrls: ['./order-show-modal.component.scss']
})
export class OrderShowModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  // @ViewChild('overlay') overlay: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
  }

  // closeModal(event: Event): void {
  //   if (this.overlay.nativeElement === event.target)
  //     this.close.emit()
  // }

}
