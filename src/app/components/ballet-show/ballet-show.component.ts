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
import {Gallery} from "../../../interfaces/Gallery";
import {GallerySlider} from "../../../interfaces/gallerySlider";
import {BalletShowItemsServiceAdditional} from "../../services/getBalletShowItemsAdditional";
import {ParodyItemsServiceAdditional} from "../../services/getParodyItemsAdditional";

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
  private subsBalletShowItemsAdditional?: Subscription;
  private subsParodyItems?: Subscription;
  private subsParodyItemsAdditional?: Subscription;
  lang: LangItem = dictionary;
  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицeй работаем]
  balletShowItems?: Item[];
  balletShowItemsAdditional?: Item[];
  parodyItems?: Item[];
  parodyItemsAdditional?: Item[];
  galleryIndicatorBallet: string = "88888888";
  galleryIndicatorParody: string = "999999999";
  galleryIndicator?: string; // для Балета это "88888888" , для Пародий это "999999999"
  hrefPageName: string = "ballet-show"// название страницы из url
  gallery?: GallerySlider[];

  constructor(public i18n: I18nService,
              private apiService: ApiService,
              private mainPageService: MainPageService,
              private balletShowItemsServiceAdditional: BalletShowItemsServiceAdditional,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              private parodyItemsServiceAdditional: ParodyItemsServiceAdditional,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    // устанавливаем имя страницы
    this.route.params.subscribe(params => {
      let href = this.router.url;
      this.hrefPageName = href.split('/').slice(-1).join();
      this.tableName = this.hrefPageName == 'ballet-show' ? 'BalletPage' : "ParodyPage";
      if (this.hrefPageName == "ballet-show") {
        this.tableName = "BalletPage";
        this.galleryIndicator = this.galleryIndicatorBallet;
      } else {
        this.tableName = "ParodyPage";
        this.galleryIndicator = this.galleryIndicatorParody;
      }
    })

    this.subs = this.mainPageService.mainText$.subscribe(text => this.mainText = text);
    this.balletShowItems = this.balletShowItemsService.currentBalletItems;
    this.subsBalletShowItems = this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
      this.balletShowItems = data;
    });

    this.balletShowItemsAdditional = this.balletShowItemsServiceAdditional.currentBalletItemsAdditional;
    this.subsBalletShowItemsAdditional = this.balletShowItemsServiceAdditional?.balletItemsAdditional$.subscribe((data: Item[]) => {
      this.balletShowItemsAdditional = data;
    });

    this.parodyItems = this.parodyItemsService.currentParodyItems;
    this.subsParodyItems = this.parodyItemsService?.parodyItems$.subscribe((data: Item[]) => {
      this.parodyItems = data;
    });

    this.parodyItemsAdditional = this.parodyItemsServiceAdditional.currentParodyItemsAdditional;
    this.subsParodyItemsAdditional = this.parodyItemsServiceAdditional?.parodyItemsAdditional$.subscribe((data: Item[]) => {
      this.parodyItemsAdditional = data;
    });

    if (this.galleryIndicator) {
      this.getSliderGalleryItems(this.galleryIndicator);
    }
  }
  ngOnDestroy(): void {
    // отмена подписки
    this.subs?.unsubscribe();
    this.subsBalletShowItems?.unsubscribe();
    this.subsBalletShowItemsAdditional?.unsubscribe();
    this.subsParodyItems?.unsubscribe();
    this.subsParodyItemsAdditional?.unsubscribe();
  }

  getSliderGalleryItems(galleryIndicator: string | number): void {
    if (galleryIndicator) {
      this.apiService.getSliderGalleryItems(galleryIndicator).subscribe({
        next: (v) => {
          this.gallery = v;
        },
        error: (e) => {},
        complete: () => {}
      })
    }
  }

}
