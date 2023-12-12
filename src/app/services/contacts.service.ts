import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Item} from "../../interfaces/Item";
import {Contacts} from "../../interfaces/Contacts";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts = new Subject<Contacts>();
  public contacts$ = this.contacts.asObservable();
  public currentContacts?: Contacts;
  public changeCurrentContacts(data: Contacts) {
    this.contacts.next(data);
    this.currentContacts = data;

  }
  constructor() { }
}
