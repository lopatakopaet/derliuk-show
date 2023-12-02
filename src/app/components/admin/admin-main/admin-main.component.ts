import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../interfaces/Item";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {ApiService} from "../../../services/api.service";
import {I18nService} from "../../../services/i18n.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ParodyItemsService} from "../../../services/getParodyItems";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  // balletShowItems?: Item[];
  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицой работаем]
  // hrefPageName: string = "ballet-page"// название страницы из url
  constructor(private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              private apiService: ApiService,
              public i18n: I18nService,
              private router: Router,
              private route: ActivatedRoute,) {
    // let href = this.router.url;
    // // получаем название страницы из url
    // this.hrefPageName = href.split('/').slice(-1).join();

  }

  ngOnInit(): void {
    this.apiService.getMostPopularItems('balletShowItems').subscribe(data => {
      // this.balletShowItems = data;
      // set balletShowItems
      this.balletShowItemsService.changeBalletShowItems(data);
    })
    this.apiService.getMostPopularItems('parodyItems').subscribe(data => {
      // this.balletShowItems = data;
      // set balletShowItems
      this.parodyItemsService.changeParodyItems(data);
    })
    // this.route.params.subscribe(params => {
    //   let href = this.router.url;
    //   console.log('href', href);
    //   this.hrefPageName = href.split('/').slice(-1).join();
    //   if (this.hrefPageName == 'ballet-page') {
    //     this.tableName = 'balletShowItems';
    //   } else if (this.hrefPageName == 'parody-page') {
    //     this.tableName = 'parodyItems';
    //   }
    //
    //   this.apiService.getMostPopularItems(this.tableName).subscribe(data => {
    //     this.balletShowItems = data;
    //     // set balletShowItems
    //     this.balletShowItemsService.changeBalletShowItems(data);
    //   })
    // })
    //
    // this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
    //   this.balletShowItems = data;
    // });

    this.setDefaultLang();
  }

  setDefaultLang(): void {
    this.i18n.setDefaultLang();
  }

}
