import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Item} from "../../../../interfaces/Item";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-item-details',
  templateUrl: './admin-item-details.component.html',
  styleUrls: ['./admin-item-details.component.scss']
})
export class AdminItemDetailsComponent implements OnInit, AfterViewInit {
  balletShowItem?: Item;
  itemId?: string | null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.itemId = this.route.snapshot.paramMap.get('id') || "0";
    // if (this.itemId === "0") {
    //   this.itemId = null;
    // } else {
    //   this.getBalletShowItem(this.itemId)
    // }
  }

  ngAfterViewInit(): void {
    // this.itemId = this.route.snapshot.paramMap.get('id') || "0";
    // if (this.itemId === "0") {
    //   this.itemId = null;
    // } else {
    //   this.getBalletShowItem(this.itemId)
    // }
  }

  // getBalletShowItem(id: string | number): any {
  //   this.apiService.getBalletShowItem(id).subscribe(data => {
  //     this.balletShowItem = data[0]
  //     console.log('this.balletShowItem', this.balletShowItem)
  //   })
  // }

}
