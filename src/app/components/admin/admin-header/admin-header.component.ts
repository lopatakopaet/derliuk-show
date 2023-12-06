import { Component, OnInit } from '@angular/core';
import {LangItem} from "../../../../interfaces/LangInterface";
import * as dictionary from "../../../i18n/i18n.json";
import {I18nService} from "../../../services/i18n.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  lang: LangItem = dictionary;
  constructor(public i18n: I18nService) { }

  ngOnInit(): void {
  }
  setLang(langName: string): void {
    this.i18n.changeLang(langName);
  }
}
