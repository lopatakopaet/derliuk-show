import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Item} from "../../../../interfaces/Item";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {I18nService} from "../../../services/i18n.service";

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  balletShowItems?: Item[];
  hideBalletShowItems: boolean = false;
  constructor(private apiService: ApiService,
              private balletShowItemsService: BalletShowItemsService,
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.balletShowItems = this.balletShowItemsService.currentBalletItems;
    this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
      this.balletShowItems = data;
      console.log('this.balletShowItems', this.balletShowItemsService.balletItems$);
    });
    this.apiService.getBalletShowItems().subscribe(data => {
      this.balletShowItems = data
      console.log(data);
    })
  }

}
