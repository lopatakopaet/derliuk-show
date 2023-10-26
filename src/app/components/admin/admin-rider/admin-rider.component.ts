import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-admin-rider',
  templateUrl: './admin-rider.component.html',
  styleUrls: ['./admin-rider.component.scss']
})
export class AdminRiderComponent implements OnInit, AfterViewInit {
  // @ViewChild('listForm') listForm: ElementRef;
  @ViewChild('listForm') listForm: ElementRef<HTMLDivElement> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let test = this.listForm?.nativeElement.querySelectorAll('.admin-list-input');
    // let test: NodeList | undefined = this.listForm?.nativeElement.childNodes;
    console.log('test', test);

    if (test) {
      for (let i = 0; i < test.length; i++) {
        console.log('key i', test[i].textContent);
      }
    }
  }

  addNewList():void {
    this.listForm?.nativeElement.insertAdjacentHTML('beforeend', '<p class="admin-list-input" contenteditable="true">asdfas</p>');

    let test = this.listForm?.nativeElement.querySelectorAll('.admin-list-input');
    // let test: NodeList | undefined = this.listForm?.nativeElement.childNodes;
    console.log('test', test);

    if (test) {
      for (let i = 0; i < test.length; i++) {
        console.log('key i', test[i].textContent);
      }
    }
  }

}
