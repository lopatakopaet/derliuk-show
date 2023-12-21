import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from "../../../interfaces/Comment";
import {Subscription, switchMap} from "rxjs";
import {Gallery} from "../../../interfaces/Gallery";
import {Item} from "../../../interfaces/Item";
import {I18nService} from "../../services/i18n.service";
import {ApiService} from "../../services/api.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";
import {CommentsService} from "../../services/comments.service";

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
              private commentsService: CommentsService,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let hrefArr = this.router.url.split('/');
      this.id = this.route.snapshot.paramMap.get('id') || 0;
      if (hrefArr.includes('ballet-show')) {
        this.tableItemsName = 'balletShowItems';
      } else if (hrefArr.includes('parody-theater')) {
        this.tableItemsName = 'parodyItems';
      }
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

}
