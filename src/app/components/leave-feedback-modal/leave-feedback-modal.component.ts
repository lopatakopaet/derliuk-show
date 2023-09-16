import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-leave-feedback-modal',
  templateUrl: './leave-feedback-modal.component.html',
  styleUrls: ['./leave-feedback-modal.component.scss']
})
export class LeaveFeedbackModalComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
