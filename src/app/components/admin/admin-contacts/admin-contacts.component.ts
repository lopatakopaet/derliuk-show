import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {I18nService} from "../../../services/i18n.service";

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.scss']
})
export class AdminContactsComponent implements OnInit {
  @ViewChild('contactsForm') contactsForm: ElementRef<HTMLDivElement> | undefined;
  contacts?: {
    description: string;
    [key: string]: any
  };
  contactsId: number = 1; // для базы данных, все данные хранятся в json в первой строке таблицы
  constructor(private apiService: ApiService,
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.getContacts();
    // this.apiService.addContacts('test111').subscribe(req => {
    //   console.log("req", req);
    // })
  }

  getContacts(): void {
    this.apiService.getContacts().subscribe(data => {
      console.log("data",data)
      this.contacts = JSON.parse(data[0].data);
      // this.contacts = data[0].data;
      console.log("this.contacts1", this.contacts)
      console.log("this.contacts",this.contacts?.description)
    })
  }

  saveContacts(): void {
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
    } else {
      console.error("description are empty")
      return
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
    console.log('contactsData',contactsData)
    this.apiService.changeContacts({data: contactsData, id: this.contactsId}).subscribe(data => {
      console.log(data)
    })

    // for (let i = 0, i < phonesElem.length; i++) {
    //
    // }

  }

}
