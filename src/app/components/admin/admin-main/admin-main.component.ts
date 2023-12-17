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
  // hrefPageName: string = "ballet-page"// название страницы из url
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
      photo: '../../../assets/img/delete/ava4.jpg',
      name: 'Anna4',
      date: '20.09.2020',
      rating: 4,
      comment: 'Олег, ми з жінкою хочемо написати відгук про вашу роботу!\n' +
        'Коли ми з вами домовлявся про виступ вашого гурту, то ми і уявити не могли як відреагують наші гості на ваш виступ!\n' +
        'Це неймовірно!!!\n' +
        'Я довго думав яку програму замовити для нашого свята, бачив в житті багато, але те що ви зробили, це просто АГОНЬ🔥💪!\n' +
        'Гості були різного статусу та віку, ви підкорили серця всіх, скільки позитивних відгуків я давно не чув від своїх родичів)Це було 45 хвилин вибуху емоцій!\n' +
        'Ви та ваша команда дуже талановиті професіонали!\n' +
        'Тому всім хто читає ці відгуки та ще вирішує чи замовляти послуги команди Олега, повірте вам каже ведучий з 15 річним стажем який бачив в житті багато шоу програм, тому замовляйте і не хвилюйтесь, ви залишитесь задоволені на 1000%\n' +
        'Рекомендував і буду рекомендувати вас!!!\n' +
        'З повагою родина Кравченко',
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
    this.commentsService.changeComments$(this.comments);
  }
}
