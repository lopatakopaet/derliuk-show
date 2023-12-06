import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  lang: string = localStorage.getItem('lang') || "ua";
  localstorLang: string | null = localStorage.getItem('lang');
  constructor() {}



  changeLang(langName: string): void {
    this.lang = langName;
    localStorage.setItem('lang', this.lang);
    this.localstorLang = langName;
  }

  setDefaultLang(): void {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', this.lang)
    } else {
      this.lang = this.localstorLang || "ua";
    }
  }
}
