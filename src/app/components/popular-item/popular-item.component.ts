import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../interfaces/Item";
import {I18nService} from "../../services/i18n.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";

@Component({
  selector: 'app-popular-item',
  templateUrl: './popular-item.component.html',
  styleUrls: ['./popular-item.component.scss']
})
export class PopularItemComponent implements OnInit {

  @Input() item?: Item;
  lang: LangItem = dictionary;
  constructor(public i18n: I18nService) { }

  ngOnInit(): void {
  }

}
