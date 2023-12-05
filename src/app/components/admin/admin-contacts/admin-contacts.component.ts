import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {I18nService} from "../../../services/i18n.service";
import {LangItem} from "../../../../interfaces/LangInterface";
import * as dictionary from "../../../i18n/i18n.json";

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.scss']
})
export class AdminContactsComponent implements OnInit {
  @ViewChild('contactsForm') contactsForm: ElementRef<HTMLDivElement> | undefined;
  contacts: {
    description: string;
    phones: ['', '', ''];
    email: string;
    [key: string]: any
  } = {
    description: '',
    phones: ['', '', ''],
    email: ''
  };
  lang: LangItem = dictionary;
  contactsId: number = 1; // для базы данных, все данные хранятся в json в первой строке таблицы
  contactsDescriptionDefault : string = "Переконаний, що життя має бути наповнене яскравими фарбами. Особливо під час важивих подій, сімейних свят. Наша\n" +
    "    команда перетворить Ваш захід у справжню феєрію, яку ви запам’ятаєте на все життя! У нашому репертуарі понад <a href=\"/ballet-show\"\n" +
    "  >30 танцювальних номерів</a> та <a href=\"/parody-theater\" >20 пародій</a>. Працюємо для Вас з повною віддачею!"

  constructor(private apiService: ApiService,
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.apiService.getContacts().subscribe(data => {
      this.contacts = JSON.parse(data[0].data);
    })
  }

  saveContacts(): void {
    let isToChangeContact = confirm('Змінити данні?');
    if (isToChangeContact) {
      let contactsData = "";
      let data = {
        description: "",
        phones: [],
        email: []
      }
      let description = this.contactsForm?.nativeElement.querySelector('.description')?.innerHTML;
      let phonesElem = this.contactsForm?.nativeElement.querySelectorAll('.phone-input');
      let emailsElem = this.contactsForm?.nativeElement.querySelectorAll('.email-input');

      if (description) {
        data.description = description;
      }

      if (phonesElem) {
        phonesElem.forEach((val, i) => {
          // @ts-ignore
          data.phones.push(val.value);
        })
      }

      if (emailsElem) {
        emailsElem.forEach((val, i) => {
          // @ts-ignore
          data.email.push(val.value);
        })
      }
      contactsData = JSON.stringify(data);
      this.apiService.changeContacts({data: contactsData, id: this.contactsId}).subscribe({
        next: (v) => {
          this.getContacts();
          alert('Данні оновлені')
        },
        error: (e) => {alert('Не вдалося оновити данні')},
        complete: () => {}
      })
    }
  }
}
