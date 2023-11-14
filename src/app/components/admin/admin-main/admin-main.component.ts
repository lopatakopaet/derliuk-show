import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../interfaces/Item";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  balletShowItems?: Item[];
  constructor(private balletShowItemsService: BalletShowItemsService,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getBalletShowItems().subscribe(data => {
      this.balletShowItems = data;
      // set balletShowItems
      this.balletShowItemsService.changeBalletShowItems(data);
    })
    this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
      this.balletShowItems = data;
      console.log('this.balletShowItems', this.balletShowItemsService.balletItems$);
    });
  }

}
