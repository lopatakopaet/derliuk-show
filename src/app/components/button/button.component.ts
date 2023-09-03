import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() downloadButton: boolean = true;
  @Output() clickEvent = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

}
