import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from "../../../interfaces/Comment";
import {switchMap} from "rxjs";
import {Gallery} from "../../../interfaces/Gallery";
import {Item} from "../../../interfaces/Item";
import {I18nService} from "../../services/i18n.service";
import {ApiService} from "../../services/api.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item?: Item;
  tableItemsName: string = 'balletShowItems';
  lang: LangItem = dictionary;
  id?: number | string;
  comments: Comment[] = [
    {
      photo: '../../../assets/img/delete/ava1.jpg',
      name: 'Максим',
      date: '22.12.2021',
      rating: 5,
      comment: 'Спасибо большое за шоу на вчерашнем вечере!!! Очень всё понравилось ... Здоровья Вам и вашему коллективу!!! ' +
        'Будет возможность буду обращаться и советовать Вас всем ...',
    },
    {
      photo: '../../../assets/img/delete/ava2.jpg',
      name: 'Аліна Гребеник',
      date: '17.03.2021',
      rating: 5,
      comment: 'Діти зробили подарунок на ювілей та запросили сюрпризом для мене шоу-програму Олега Дерлюка. Захват та подив мій та всіх гостей не можна передати словами. Колектив - справжні професіонали своєї справи, які отримують задоволення від роботи. Яскраві костюми, різноманітний репертуар, завжди вдала імпровізація та контакт з глядачами. Якщо хочете отримати незабутні враження від свята, тоді раджу замовляти колектив Олега Дерлюка.',
    },
    {
      photo: '../../../assets/img/delete/ava3.jpg',
      name: 'Олександр та Софія',
      date: '08.09.23',
      rating: 5,
      comment: 'Дякуємо вам за чудово поставлений весільний танець за досить короткий термін!!! Гості були в захваті, приємно здивовані та розчулені☺️ Всім рекомендуємо, бо саме тут поставлять танець, який буде вам по силі, але при цьому личитиме вам! ',
    },
    {
      photo: '../../../assets/img/delete/ava2.png',
      name: 'Anna4',
      date: '14.10.2023',
      rating: 4,
      comment: 'Замовляли шоу-програму на весілля і дуже задовлені! ' +
        'Приємно здивував репертуар, який був до смаку і нам, і нашим гостям. ' +
        'Настрій і атмосфера свята вдались!',
    },
    {
      photo: '../../../assets/img/delete/ava.png',
      name: 'Марина та Тарас5',
      date: '14.10.2021',
      rating: 5,
      comment: 'Вдячна колективу VIP за феєричну атмомсферу свята.\n' +
        '    Наші гості були у захваті, а наша родина назавжди запам’ятає цей Юбілей.\n' +
        '    Дякуємо за ваш професіоналізм і незабутній настрій!',
    }, {
      photo: '../../../assets/img/delete/ava2.png',
      name: 'Anna6',
      date: '14.10.2023',
      rating: 4,
      comment: 'Замовляли шоу-програму на весілля і дуже задовлені! ' +
        'Приємно здивував репертуар, який був до смаку і нам, і нашим гостям. ' +
        'Настрій і атмосфера свята вдались!',
    },
  ]
  gallery: Gallery[] = [
    {
      photo: '../../../assets/img/delete/slide1.png',
      id: 1,
      idPosition: 1
    },
    {
      photo: '../../../assets/img/delete/slide2.png',
      id: 2,
      idPosition: 2
    },
    {
      photo: '../../../assets/img/delete/slide1.png',
      id: 3,
      idPosition: 3
    },
    {
      photo: '../../../assets/img/delete/slide2.png',
      id: 4,
      idPosition: 4
    },
    {
      photo: '../../../assets/img/delete/slide1.png',
      id: 5,
      idPosition: 5
    },
    {
      photo: '../../../assets/img/delete/slide2.png',
      id: 6,
      idPosition: 6
    }
  ]
  constructor(private route: ActivatedRoute,
              public i18n: I18nService,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let hrefArr = this.router.url.split('/');
      this.id = this.route.snapshot.paramMap.get('id') || 0;
      if (hrefArr.includes('ballet-page')) {
        this.tableItemsName = 'balletShowItems';
      } else if (hrefArr.includes('parody-page')) {
        this.tableItemsName = 'parodyItems';
      }
      this.apiService.getBalletShowItem(this.tableItemsName, this.id).subscribe({
        next: (v) => {
          this.item = v[0];
          console.log(this.item)
        },
        error: (e) => {},
        complete: () => {}
      })
    })

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


}
