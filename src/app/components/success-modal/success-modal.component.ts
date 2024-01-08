import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {
  @Output() startTimerModal = new EventEmitter();
  timeDuration: number = 10
  timeLeft: number = this.timeDuration;
  interval: any;
  @ViewChild("dialog") dialog?: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  show() {
    this.dialog?.nativeElement?.show();
    this.startTimer();
  }

  close() {
    this.dialog?.nativeElement.close();
    this.router.navigate([`ballet-show`]);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.close();
        this.pauseTimer();
      }
    },1000)
  }


  pauseTimer() {
    clearInterval(this.interval);
    this.timeLeft = this.timeDuration;
  }

}
