import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {I18nService} from "../../services/i18n.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";
import {Contacts} from "../../../interfaces/Contacts";
import {ContactsService} from "../../services/contacts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts?: Contacts;
  private subs?: Subscription;
  lang: LangItem = dictionary;
  textTest: any = ' Переконаний, що життя має бути наповнене яскравими фарбами. Особливо під час важливих подій, сімейних свят. Наша\n' +
    '    команда перетворить Ваш захід у справжню феєрію, яку ви запам’ятаєте на все життя! У нашому репертуарі понад <a routerLink="ballet-show" routerLinkActive="active"\n' +
    '    >30 танцювальних номерів</a> та <a href="/parody-theater">20 пародій</a>. Працюємо для Вас з повною віддачею!'

  constructor(private apiService: ApiService,
              private contactService: ContactsService,
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.subs = this.contactService?.contacts$.subscribe((data: Contacts) => {
      this.contacts = data;
    });

  }

  ngOnDestroy(): void {
    // отмена подписки на contacts
    this.subs?.unsubscribe();
  }

  // getContacts(): any {
  //   this.apiService.getContacts().subscribe(data => {
  //     console.log("data",data)
  //     this.contacts = JSON.parse(data[0].data);
  //   })
  // }
}
