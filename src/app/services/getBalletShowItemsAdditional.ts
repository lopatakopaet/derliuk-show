import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Item} from "../../interfaces/Item";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class BalletShowItemsServiceAdditional {
  private balletItemsAdditional = new Subject<Item[]>();
  public balletItemsAdditional$ = this.balletItemsAdditional.asObservable();
  public currentBalletItemsAdditional?: Item[];
  public changeBalletShowItemsAdditional(data: Item[]) {
    let dataSorted = this.sortItems(data)
    this.balletItemsAdditional.next(dataSorted);
    this.currentBalletItemsAdditional = dataSorted;

  }
  sortItems(items: Item[]): Item[] {
    return items.sort((n1, n2) => n1.idPosition - n2.idPosition)
  }
}
