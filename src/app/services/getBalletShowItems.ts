import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Item} from "../../interfaces/Item";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class BalletShowItemsService {
  private balletItems = new Subject<Item[]>();
  public balletItems$ = this.balletItems.asObservable();
  public currentBalletItems?: Item[];
  public changeBalletShowItems(data: Item[]) {
    this.balletItems.next(data);
    this.currentBalletItems = data;
    // this.apiService.getBalletShowItems().subscribe(data => {
    //   this.balletItems$ = data;
    //   console.log("CERVISE", data);
    //   this.balletItems$.next(data);
    //
    // })

  }

  // public count$ = new Subject<number>();
  //
  // public changeCount(count: number) {
  //   this.count$.next(count);
  // }
}
