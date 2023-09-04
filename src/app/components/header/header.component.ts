import { Component, OnInit } from '@angular/core';
import {I18nService} from "../../services/i18n.service";
import * as lang from "../../i18n/i18n.json";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // lang: string;

  constructor(public i18n: I18nService) {
    // this.lang = i18n.lang
  }



  ngOnInit(): void {
  }

  setLang(langName: string): void {
    this.i18n.changeLang(langName);
    // this.lang = this.i18n.lang;
  }

}
