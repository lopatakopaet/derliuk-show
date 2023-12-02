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
    let dataSorted = this.sortItems(data)
    this.balletItems.next(dataSorted);
    this.currentBalletItems = dataSorted;

  }
  sortItems(items: Item[]): Item[] {
    return items.sort((n1, n2) => n1.idPosition - n2.idPosition)
  }

  // public count$ = new Subject<number>();
  //
  // public changeCount(count: number) {
  //   this.count$.next(count);
  // }
}
