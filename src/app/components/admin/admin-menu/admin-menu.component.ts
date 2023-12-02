import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Item} from "../../../../interfaces/Item";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {I18nService} from "../../../services/i18n.service";
import {ParodyItemsService} from "../../../services/getParodyItems";

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  balletShowItems?: Item[];
  parodyItems?: Item[];
  isShowBalletShowItems: boolean = false;
  isShowParodyItems: boolean = false;
  constructor(private apiService: ApiService,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.balletShowItems = this.balletShowItemsService.currentBalletItems;
    this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
      this.balletShowItems = data;
    });

    this.parodyItems = this.parodyItemsService.currentParodyItems;
    this.parodyItemsService?.parodyItems$.subscribe((data: Item[]) => {
      this.parodyItems = data;
    });
  }

}
