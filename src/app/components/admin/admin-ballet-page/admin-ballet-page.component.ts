import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Item} from "../../../../interfaces/Item";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {BalletPage} from "../../../../interfaces/BalletPage";
import {I18nService} from "../../../services/i18n.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Gallery} from "../../../../interfaces/Gallery";
import {ParodyItemsService} from "../../../services/getParodyItems";
import {Comment} from "../../../../interfaces/Comment";
import {CommentsService} from "../../../services/comments.service";
import {Subscription} from "rxjs";
import {GallerySlider} from "../../../../interfaces/gallerySlider";

@Component({
  selector: 'app-admin-ballet-page',
  templateUrl: './admin-ballet-page.component.html',
  styleUrls: ['./admin-ballet-page.component.scss']
})
export class AdminBalletPageComponent implements OnInit, OnDestroy {
  @ViewChild('MainPageForm') mainPageForm: ElementRef<HTMLDivElement> | undefined;
  @ViewChild("MainPhotoForm") MainPhotoForm?: ElementRef;
  @ViewChild("mainPhotoInput") mainPhotoInput?: ElementRef;

  private subs?: Subscription;
  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицой работаем]
  tableItemsName: string = "balletShowItems"; // для запросов в БД, указываем с какой таблицой работаем]
  hrefPageName: string = "ballet-page"// название страницы из url
  balletShowItems?: Item[];
  parodyItems?: Item[];
  comments?: Comment[];
  pageData: BalletPage = {
    id: 1,
    mainPhoto: '',
    mainText_ua: '',
    mainText_en: '',
    seoText_ua: '',
    seoText_en: '',
  };
  pageNewData: {
    tableName: string;
    data: BalletPage;
  } = {
    tableName: this.tableName,
    data: this.pageData
  }

  galleryIndicatorBallet: string = "88888888";
  galleryIndicatorParody: string = "999999999";
  galleryIndicator?: string; // для Балета это "88888888" , для Пародий это "999999999"
  gallery?: GallerySlider[];
  itemsShowLimit: number = 5;
  currentItemsShowLimit: number = 5;
  isShowAllActive: boolean = false; // отображается ли весь список номеров
  constructor(private apiService: ApiService,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              public i18n: I18nService,
              private router: Router,
              private route: ActivatedRoute,
              private commentsService: CommentsService
             ) {
    let href = this.router.url;
    // получаем название страницы из url и установка таблицы, в которую будет запись данных для главной страницы (фото, сеотекст, главный текст)
    this.hrefPageName = href.split('/').slice(-1).join();
    this.tableName = this.hrefPageName == 'ballet-page' ? 'BalletPage' : "ParodyPage";
    this.pageNewData.tableName = this.tableName;
  }

  ngOnInit(): void {
    this.comments = this.commentsService.comments;
    this.subs = this.commentsService.comments$.subscribe(comments => {
      this.comments = comments;
    });

    this.route.params.subscribe(params => {
      let href = this.router.url;
      this.hrefPageName = href.split('/').slice(-1).join();
      if (this.hrefPageName == 'ballet-page') {
        this.tableItemsName = 'balletShowItems';
        this.galleryIndicator = this.galleryIndicatorBallet;
        this.balletShowItems = this.balletShowItemsService.currentBalletItems;
        this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
          this.balletShowItems = data;
        });
      } else if (this.hrefPageName == 'parody-page') {
        this.tableItemsName = 'parodyItems';
        this.galleryIndicator = this.galleryIndicatorParody;
        this.parodyItems = this.parodyItemsService.currentParodyItems;
        this.parodyItemsService?.parodyItems$.subscribe((data: Item[]) => {
          this.parodyItems = data;
        });
      }
    })

    this.apiService.getMainPage(this.tableName).subscribe(data=>{
      this.pageData = data[0];
      this.pageNewData.data = data[0];
    })
  }

  ngOnDestroy(): void {
    // отмена подписки
    this.subs?.unsubscribe();
  }

  /**
   * Смена данных на странице (фото, главный текс и сео текст)
   */
  changeMainPage(oldPhoto?: string): void {
    this.apiService.changeMainPage(this.pageNewData).subscribe({
      next: (v) => {
        if (oldPhoto) {
          this.deletePhoto(oldPhoto);
        }
        alert('Дані змінено')
      },
      error: (e) => alert('Не вдалося змінити дані =('),
      complete: () => {}
    })
  }

  changeMainPhoto(): void {
     if (this.MainPhotoForm) {
       this.apiService.saveFile(this.MainPhotoForm.nativeElement)
         .then(answer => {
           if (answer.message === "File uploaded successfully") {
             if (this.pageNewData.data.mainPhoto) {
               let oldPhoto = this.pageNewData.data.mainPhoto;
               this.pageNewData.data.mainPhoto = answer.data.url;
               this.changeMainPage(oldPhoto);
             } else {
               this.pageNewData.data.mainPhoto = answer.data.url;
               this.changeMainPage();
             }
           } else {
             alert("Помилка при заватаженні файла")
             console.error('answer', answer);
           }
         })
     }
  }

  changeMainText(): void {
    let text = this.mainPageForm?.nativeElement.querySelector('.main-text__content')?.innerHTML;
    if (text && this.pageData.id) {
      this.pageNewData.data['mainText_' + this.i18n.lang] = text;
      this.changeMainPage();
    }
  }

  changeSeoText(): void {
    let text = this.mainPageForm?.nativeElement.querySelector('.seo__text')?.innerHTML;
    if (text && this.pageData.id) {
      this.pageNewData.data['seoText_' + this.i18n.lang] = text;
      this.changeMainPage();
    }
  }

  deletePhoto(photo: string): void {
    let data = {
      filePath: photo
    }
    this.apiService.deleteFile(data).subscribe({
      complete: () => {}
    })
  }

  showAll(items: Item[] | undefined): void {
    if (items) {
      this.currentItemsShowLimit = items.length;
      this.isShowAllActive = true;
    }
  }
  hideItems(): void {
    this.currentItemsShowLimit = this.itemsShowLimit;
    this.isShowAllActive = false;
  }
}
