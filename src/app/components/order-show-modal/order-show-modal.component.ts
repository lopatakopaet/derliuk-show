import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Item} from "../../../interfaces/Item";
import {ContactsService} from "../../services/contacts.service";
import {Contacts} from "../../../interfaces/Contacts";
import {Subscription} from "rxjs";
import {I18nService} from "../../services/i18n.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-order-show-modal',
  templateUrl: './order-show-modal.component.html',
  styleUrls: ['./order-show-modal.component.scss']
})
export class OrderShowModalComponent implements OnInit {
  contacts: Contacts = {
    description_ua: '',
    description_en: '',
    phones: ["", "", ""],
    email: ''
  };
  lang: LangItem = dictionary;
  @Output() close = new EventEmitter();
  @Output() openSuccessModal = new EventEmitter();
  // @ViewChild('overlay') overlay: ElementRef<HTMLDivElement>;
  private subs?: Subscription; // подписка на контакты
  checkErr: boolean = false;
  constructor(private contactService: ContactsService,
              private apiService: ApiService,
              public i18n: I18nService,
              private elRef:ElementRef) { }

  ngOnInit(): void {
    this.subs = this.contactService?.contacts$.subscribe((data: Contacts) => {
      this.contacts = data;
    });
  }

  ngOnDestroy(): void {
    // отмена подписки на contacts
    this.subs?.unsubscribe();
  }

  onFormSubmit(orderShowForm: NgForm) {
    let data: {name: string; phone: string; comment: string} = {
      name: orderShowForm.value.name,
      phone: orderShowForm.value.phone,
      comment: orderShowForm.value.comment,
    }
    if (!orderShowForm.value.check) {
      this.checkErr = true;
      return
    } else {
      this.checkErr = false;
    }
    if (data.name && data.phone && data.comment) {
      this.close.emit();
      let loader = this.elRef.nativeElement.querySelector('.preloader');
      loader.style.display = "flex"; //show loader
      this.apiService.orderShow(data).subscribe({
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

  // closeModal(event: Event): void {
  //   if (this.overlay.nativeElement === event.target)
  //     this.close.emit()
  // }

}
