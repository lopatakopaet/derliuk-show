import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from "../../../interfaces/Comment";
import {Subscription, switchMap} from "rxjs";
import {Item} from "../../../interfaces/Item";
import {I18nService} from "../../services/i18n.service";
import {ApiService} from "../../services/api.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";
import {CommentsService} from "../../services/comments.service";
import {GallerySlider} from "../../../interfaces/gallerySlider";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  private subs?: Subscription;
  item?: Item;
  tableItemsName: string = 'balletShowItems';
  lang: LangItem = dictionary;
  id?: number | string;
  comments?: Comment[];
  gallery?: GallerySlider[];
  galleryIndicator?: string | number;
  mainTypeItem: number = 1; // идентификатор главного(популярного) номера
  additionalTypeItem: number = 2; // идентификатор дополнительного номера
  itemType?: number | string = this.mainTypeItem; // по умолчанию стоят популярные номера

  constructor(private route: ActivatedRoute,
              public i18n: I18nService,
              private apiService: ApiService,
              private commentsService: CommentsService,
              private router: Router) { }

  ngOnInit(): void {
    // определяем на какой странице и получаем/задаем нужные данные
    this.route.params.subscribe(params => {
      let hrefArr = this.router.url.split('/');
      this.id = this.route.snapshot.paramMap.get('id') || 0;
      this.galleryIndicator = this.id;
      this.itemType = this.route.snapshot.queryParamMap.get('type') || this.mainTypeItem;
      if (hrefArr.includes('ballet-show')) {
        if (this.itemType == this.mainTypeItem) {
          this.tableItemsName = 'balletShowItems';
        } else {
          this.tableItemsName = 'balletShowItemsAdditional';
        }
      } else if (hrefArr.includes('parody-theater')) {
        if (this.itemType == this.mainTypeItem) {
          this.tableItemsName = 'parodyItems';
        } else {
          this.tableItemsName = 'parodyItemsAdditional';
        }
      }
      this.getSliderGalleryItems(this.galleryIndicator, this.tableItemsName);
      this.apiService.getBalletShowItem(this.tableItemsName, this.id).subscribe({
        next: (v) => {
          this.item = v[0];
        },
        error: (e) => {},
        complete: () => {}
      })
    })

    this.comments = this.commentsService.comments;
    this.subs = this.commentsService.comments$.subscribe(comments => {
      this.comments = comments;
    });

    // this.route.paramMap.pipe(
    //   switchMap(params => params.getAll('id'))
    // )
    //   .subscribe(data=> this.id = +data);
    // if (this.tableName == 'balletShowItems') {
    //   this.balletShowItemsService.changeBalletShowItems(v);
    // } else if (this.tableName == 'parodyItems') {
    //   this.parodyItemsService.changeParodyItems(v);
    // }
    // this.apiService.getBalletShowItem(this.id).subscribe({
    //   next: (v) => {
    //
    //     this.item = v;
    //   },
    //   error: (e) => {},
    //   complete: () => {}
    // })
  }
  ngOnDestroy(): void {
    // отмена подписки
    this.subs?.unsubscribe();
  }

  /**
   * Получить элементы для видео/фото слайдера
   * @param galleryIndicator
   */
  getSliderGalleryItems(galleryIndicator: string | number, tableName: string): void {
    if (galleryIndicator) {
      this.apiService.getSliderGalleryItems(galleryIndicator, tableName).subscribe({
        next: (v) => {
          this.gallery = v;
        },
        error: (e) => {},
        complete: () => {}
      })
    }
  }
}
