import {Component, Input, OnInit,} from '@angular/core';
import {Item} from "../../../interfaces/Item";
import * as dictionary from "../../i18n/i18n.json";
import {LangItem} from "../../../interfaces/LangInterface";

import {I18nService} from "../../services/i18n.service";
import {MainPageService} from "../../services/main-page.service";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BalletPage} from "../../../interfaces/BalletPage";
import {Subscription} from "rxjs";
import {BalletShowItemsService} from "../../services/getBalletShowItems";
import {ParodyItemsService} from "../../services/getParodyItems";

@Component({
  selector: 'app-ballet-show',
  templateUrl: './ballet-show.component.html',
  styleUrls: ['./ballet-show.component.scss']
})
export class BalletShowComponent implements OnInit {
  @Input() pageData: BalletPage = {
    id: 1,
    mainPhoto: '',
    mainText_ua: '',
    mainText_en: '',
    seoText_ua: '',
    seoText_en: '',
  };
  mainText: {
    mainText_ua: string;
    mainText_en: string;
    [key: string]: any;
  } = {
    mainText_ua: '',
    mainText_en: '',

  }
  private subs?: Subscription;
  private subsBalletShowItems?: Subscription;
  private subsParodyItems?: Subscription;
  lang: LangItem = dictionary;
  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицeй работаем]
  balletShowItems?: Item[];
  parodyItems?: Item[];
  hrefPageName: string = "ballet-show"// название страницы из url

  // popularItemsArr = [
  //   new Item({
  //     photo: 'assets/img/delete/item-1.png',
  //     title: 'Brasil Show',
  //     descriptionUa: 'Яскаве пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
  //       '      бразильського карнавалу на будь-якому заході. <br>\n' +
  //       '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
  //       '      які ідеально впишуться в тематику бразильської вечірки.',
  //     descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
  //       '      бразильського карнавалу на будь-якому заході. <br>\n' +
  //       '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
  //       '      які ідеально впишуться в тематику бразильської вечірки.',
  //     // description1: {
  //     //   en: '',
  //     //   ua: ''
  //     // }
  //
  //   }, 'ua'),
  //   new Item({
  //     photo: 'assets/img/delete/item-2.png',
  //     title: 'Disco Show',
  //     descriptionUa: 'Запальний номер з неперевершеною енергетикою перенесе глядача в атмосферу 80-х. <br><br>Відчуйте драйв та танцюйте прямо з нами! “V.I.P” балет подарує яскраві враження та незрівнянну атмосферу свята. З нами ваш корпоратив, весілля, день народження, клубна вечірка або презентація стануть неперевершеними! Ми танцюємо душею і можемо зробити будь-яке свято незабутнім!',
  //     descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
  //       '      бразильського карнавалу на будь-якому заході. <br>\n' +
  //       '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
  //       '      які ідеально впишуться в тематику бразильської вечірки.',
  //     // description1: {
  //     //   en: '',
  //     //   ua: ''
  //     // }
  //
  //   }, 'ua'),
  //   new Item({
  //     photo: 'assets/img/delete/item-3.png',
  //     title: 'Antre',
  //     descriptionUa: 'Казково-легкий, чарівний та красивий номер стане незабутнім відкриттям програми чи івенту. А професіоналізм нашого колективу не залишить байдужим жодного гостя. Пориньте разом з нами у феєрію свята. Ми зробимо його незабутнім!',
  //     descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
  //       '      бразильського карнавалу на будь-якому заході. <br>\n' +
  //       '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
  //       '      які ідеально впишуться в тематику бразильської вечірки.',
  //     // description1: {
  //     //   en: '',
  //     //   ua: ''
  //     // }
  //
  //   }, 'ua'),
  //   // {
  //   //   photo: 'assets/img/delete/item-2.png',
  //   //   title: 'Disco Show',
  //   //   description: 'Запальний номер з неперевершеною енергетикою перенесе глядача в атмосферу 80-х. <br><br> Відчуйте драйв та танцюйте прямо з нами! “V.I.P” балет подарує яскраві враження та незрівнянну атмосферу свята. З нами ваш корпоратив, весілля, день народження, клубна вечірка або презентація стануть неперевершеними! Ми танцюємо душею і можемо зробити будь-яке свято незабутнім!',
  //   // },
  //   // {
  //   //   photo: 'assets/img/delete/item-3.png',
  //   //   title: '',
  //   //   description: '',
  //   // }
  // ]

  constructor(public i18n: I18nService,
              private apiService: ApiService,
              private mainPageService: MainPageService,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    // устанавливаем имя страницы
    this.route.params.subscribe(params => {
      let href = this.router.url;
      this.hrefPageName = href.split('/').slice(-1).join();
      this.tableName = this.hrefPageName == 'ballet-show' ? 'BalletPage' : "ParodyPage";
    })

    this.subs = this.mainPageService.mainText$.subscribe(text => this.mainText = text);
    this.balletShowItems = this.balletShowItemsService.currentBalletItems;
    this.subsBalletShowItems = this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
      this.balletShowItems = data;
    });

    this.parodyItems = this.parodyItemsService.currentParodyItems;
    this.subsParodyItems = this.parodyItemsService?.parodyItems$.subscribe((data: Item[]) => {
      this.parodyItems = data;
    });

  }
  ngOnDestroy(): void {
    // отмена подписки
    this.subs?.unsubscribe();
    this.subsBalletShowItems?.unsubscribe();
    this.subsParodyItems?.unsubscribe();
  }

}
