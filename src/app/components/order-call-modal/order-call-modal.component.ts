import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";
import {NgForm} from "@angular/forms";
import {ContactsService} from "../../services/contacts.service";
import {ApiService} from "../../services/api.service";
import {I18nService} from "../../services/i18n.service";

@Component({
  selector: 'app-order-call-modal',
  templateUrl: './order-call-modal.component.html',
  styleUrls: ['./order-call-modal.component.scss']
})
export class OrderCallModalComponent implements OnInit {
  lang: LangItem = dictionary;
  @Output() close = new EventEmitter();
  @Output() openSuccessModal = new EventEmitter();
  constructor(private apiService: ApiService,
              public i18n: I18nService,
              private elRef:ElementRef) {}

  ngOnInit(): void {
  }
  onFormSubmit(orderShowForm: NgForm) {
    let data: {phone: string } = {
      phone: orderShowForm.value.phone,
    }
    if (data.phone) {
      this.close.emit();
      let loader = this.elRef.nativeElement.querySelector('.preloader');
      loader.style.display = "flex"; //show loader
      this.apiService.orderCall(data).subscribe({
        next: (v) => {
          let loader = this.elRef.nativeElement.querySelector('.preloader');
          loader.style.display = "none"; //hide loader
          this.openSuccessModal.emit();
        },
        error: (e) => {console.log(e)
          let loader = this.elRef.nativeElement.querySelector('.preloader');
          loader.style.display = "none"; //hide loader
          alert("Непередбачувана технічна помилка. Ви можете замовити номер за телефонами в Контактах.")
        },
        complete: () => {
          let loader = this.elRef.nativeElement.querySelector('.preloader');
          loader.style.display = "none"; //hide loader
        }
      });
    }
  }
}
