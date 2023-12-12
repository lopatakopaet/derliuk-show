import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit, AfterViewInit {
  // @Output() close = new EventEmitter();
  @Output() startTimerModal = new EventEmitter();
  timeLeft: number = 10;
  interval: any;
  @ViewChild("dialog") dialog?: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // this.startTimer()
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
        console.log('this.timeLeft', this.timeLeft)
      } else {
        this.close();
        this.pauseTimer();
      }
    },1000)
  }


  pauseTimer() {
    clearInterval(this.interval);
  }

}
