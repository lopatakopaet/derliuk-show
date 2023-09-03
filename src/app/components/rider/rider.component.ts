import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss']
})
export class RiderComponent implements OnInit {
  showModal: boolean;

  constructor() {
    this.showModal = true
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.showModal = false;
  }

}
