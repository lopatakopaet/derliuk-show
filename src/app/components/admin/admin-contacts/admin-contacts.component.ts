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
    description_ua: string;
    description_en: string;
    phones: ["", "", ""];
    email: string;
    [key: string]: any
  } = {
    description_ua: '',
    description_en: '',
    phones: ["", "", ""],
    email: ''
  };
  lang: LangItem = dictionary;
  contactsId?: number; // для базы данных, все данные хранятся в json в первой строке таблицы
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
      this.contactsId = JSON.parse(data[0].id);
    })
  }

  saveContacts(): void {
    let isToChangeContact = confirm('Змінити данні?');
    if (isToChangeContact) {
      let contactsData = "";
      let data: {
        description_ua: string;
        description_en: string;
        phones: ["", "", ""];
        email: string;
        [key: string]: any
      } = {
        description_ua: '',
        description_en: '',
        phones: ["", "", ""],
        email: ''
      };
      // this.contacts
      if (this.contacts) {
        data = this.contacts;
      }
      let description = this.contactsForm?.nativeElement.querySelector('.description')?.innerHTML;
      let phonesElem = this.contactsForm?.nativeElement.querySelectorAll('.phone-input');
      let emailsElem = this.contactsForm?.nativeElement.querySelector('.email-input');

      if (description) {
        data['description_' + this.i18n.lang] = description || "";
      }

      if (phonesElem) {
        // data.phones = [];
        phonesElem.forEach((val, i) => {
          // @ts-ignore
          // data.phones.push(val.value);
          data.phones[i] = val.value;
        })
      }

      if (emailsElem) {
        console.log(emailsElem);
        // @ts-ignore
        data.email = emailsElem.value;
        // emailsElem.forEach((val, i) => {
        //   // @ts-ignore
        //   data.email.push(val.value);
        // })
      }
      contactsData = JSON.stringify(data);
      if (this.contactsId) {
        this.apiService.changeContacts({data: contactsData, id: this.contactsId}).subscribe({
          next: (v) => {
            this.getContacts();
            alert('Данні оновлені')
          },
          error: (e) => {alert('Не вдалося оновити данні')},
          complete: () => {}
        })
      } else {
        this.apiService.addContacts(contactsData).subscribe({
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
}
