import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../interfaces/Item";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {ApiService} from "../../../services/api.service";
import {I18nService} from "../../../services/i18n.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ParodyItemsService} from "../../../services/getParodyItems";
import {CommentsService} from "../../../services/comments.service";
import {Comment} from "../../../../interfaces/Comment";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  // balletShowItems?: Item[];
  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицой работаем]
  commentsTableName = 'comments';
  // hrefPageName: string = "ballet-page"// название страницы из url
  comments?: Comment[];
  constructor(private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              private apiService: ApiService,
              public i18n: I18nService,
              private router: Router,
              private route: ActivatedRoute,
              private commentsService: CommentsService) {
    // let href = this.router.url;
    // // получаем название страницы из url
    // this.hrefPageName = href.split('/').slice(-1).join();

  }

  ngOnInit(): void {
    this.apiService.getMostPopularItems('balletShowItems').subscribe(data => {
      this.balletShowItemsService.changeBalletShowItems(data);
    })
    this.apiService.getMostPopularItems('parodyItems').subscribe(data => {
      this.parodyItemsService.changeParodyItems(data);
    })

    this.setDefaultLang();
    this.getComments();
  }

  setDefaultLang(): void {
    this.i18n.setDefaultLang();
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
