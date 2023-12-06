import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {I18nService} from "../../services/i18n.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts?: {
    description_ua: string;
    description_en: string;
    phones?: [];
    email?: '';
    [key: string]: any
  };
  lang: LangItem = dictionary;
  textTest: any = ' Переконаний, що життя має бути наповнене яскравими фарбами. Особливо під час важивих подій, сімейних свят. Наша\n' +
    '    команда перетворить Ваш захід у справжню феєрію, яку ви запам’ятаєте на все життя! У нашому репертуарі понад <a routerLink="ballet-show" routerLinkActive="active"\n' +
    '    >30 танцювальних номерів</a> та <a href="/parody-theater">20 пародій</a>. Працюємо для Вас з повною віддачею!'

  constructor(private apiService: ApiService,
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): any {
    this.apiService.getContacts().subscribe(data => {
      console.log("data",data)
      this.contacts = JSON.parse(data[0].data);
    })
  }
}
