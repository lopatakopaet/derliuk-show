import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Item} from "../../../../interfaces/Item";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {BalletPage} from "../../../../interfaces/BalletPage";
import {I18nService} from "../../../services/i18n.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Gallery} from "../../../../interfaces/Gallery";
import {ParodyItemsService} from "../../../services/getParodyItems";

@Component({
  selector: 'app-admin-ballet-page',
  templateUrl: './admin-ballet-page.component.html',
  styleUrls: ['./admin-ballet-page.component.scss']
})
export class AdminBalletPageComponent implements OnInit {
  @ViewChild('MainPageForm') mainPageForm: ElementRef<HTMLDivElement> | undefined;
  @ViewChild("MainPhotoForm") MainPhotoForm?: ElementRef;
  @ViewChild("mainPhotoInput") mainPhotoInput?: ElementRef;

  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицой работаем]
  tableItemsName: string = "balletShowItems"; // для запросов в БД, указываем с какой таблицой работаем]
  hrefPageName: string = "ballet-page"// название страницы из url
  balletShowItems?: Item[];
  parodyItems?: Item[];
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

  data: any = {
    title: 'Antre3',
    descriptionUa: 'Казково-легкий, чарівний номер стане красивим відкриттям програми чи івенту. Пориньте разом з нами у феєрію свята.',
    // descriptionEng: "",
  }

  constructor(private apiService: ApiService,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              public i18n: I18nService,
              private router: Router,
              private route: ActivatedRoute,
             ) {
    let href = this.router.url;
    // получаем название страницы из url и установка таблицы, в которую будет запись данных для главной страницы (фото, сеотекст, главный текст)
    this.hrefPageName = href.split('/').slice(-1).join();
    this.tableName = this.hrefPageName == 'ballet-page' ? 'BalletPage' : "ParodyPage";
    this.pageNewData.tableName = this.tableName;
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let href = this.router.url;
      this.hrefPageName = href.split('/').slice(-1).join();
      if (this.hrefPageName == 'ballet-page') {
        this.tableItemsName = 'balletShowItems';
        this.balletShowItems = this.balletShowItemsService.currentBalletItems;
        this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
          this.balletShowItems = data;
        });
      } else if (this.hrefPageName == 'parody-page') {
        this.tableItemsName = 'parodyItems';
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

  /**
   * Смена данных на странице (фото, главный текс и сео текст)
   */
  changeMainPage(oldPhoto?: string): void {
    console.log(this.pageNewData);
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




    //  /** @type {HTMLFormElement} */
    //  const form: HTMLFormElement | null = formHtml;
    //  const url = new URL(form?.action);
    //  const formData = new FormData(form);
    //  // @ts-ignore
    //   const searchParams = new URLSearchParams(formData);
    //
    //  /** @type {Parameters<fetch>[1]} */
    //  const fetchOptions = {
    //    method: form.method, body: undefined
    //
    //  };
    //
    //  if (form.method.toLowerCase() === 'post') {
    //    if (form.enctype === 'multipart/form-data') {
    //      // @ts-ignore
    //      fetchOptions.body = formData;
    //    } else {
    //      // @ts-ignore
    //      fetchOptions.body = searchParams;
    //    }
    //  } else {
    //    // @ts-ignore
    //    url.search = searchParams;
    //  }
    //  console.log('formData', formData);
    //  console.log("fetchOptions", fetchOptions);
    //
    //
    // fetch(url, fetchOptions)
    //   .then(response => response.json())
    //   .then(data => console.log('data', data));

     // $event.preventDefault();
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


}
