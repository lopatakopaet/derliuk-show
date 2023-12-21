import { Component, OnInit } from '@angular/core';
import {I18nService} from "../services/i18n.service";
import * as dictionary from "../i18n/i18n.json";
import {LangItem} from "../../interfaces/LangInterface";
import {ContactsService} from "../services/contacts.service";
import {ApiService} from "../services/api.service";
import {CommentsService} from "../services/comments.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  commentsTableName = 'comments';
  lang: LangItem = dictionary;

  constructor(public i18n: I18nService,
              private apiService: ApiService,
              private contactService: ContactsService,
              private commentsService: CommentsService,) {
  }

  ngOnInit(): void {
    this.setDefaultLang();
    this.getContacts();
    this.getComments();

  }

  setLang(langName: string): void {
    this.i18n.changeLang(langName);
  }

  setDefaultLang(): void {
    this.i18n.setDefaultLang();
  }

  getContacts(): any {
    this.apiService.getContacts().subscribe(data => {
      let contacts = JSON.parse(data[0].data);
      this.contactService.changeCurrentContacts(contacts);
    })
  }

  getComments(): void {
    this.apiService.getComments(this.commentsTableName).subscribe({
      next: (v) => {
        this.commentsService.changeComments$(v)
      },
      error: (e) => {
      },
      complete: () => {}
    })
  }

}
