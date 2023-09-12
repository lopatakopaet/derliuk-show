import { Component, OnInit } from '@angular/core';
import {I18nService} from "../services/i18n.service";
import * as dictionary from "../i18n/i18n.json";
import {LangItem} from "../../interfaces/LangInterface";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  lang: LangItem = dictionary;

  constructor(public i18n: I18nService) {
  }

  ngOnInit(): void {
    this.setDefaultLang();

  }

  setLang(langName: string): void {
    this.i18n.changeLang(langName);
  }

  setDefaultLang(): void {
    this.i18n.setDefaultLang();
  }

}
