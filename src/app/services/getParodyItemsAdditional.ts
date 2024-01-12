import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Item} from "../../interfaces/Item";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class ParodyItemsServiceAdditional {
  private parodyItemsAdditional = new Subject<Item[]>();
  public parodyItemsAdditional$ = this.parodyItemsAdditional.asObservable();
  public currentParodyItemsAdditional?: Item[];
  public changeParodyItemsAdditional(data: Item[]) {
    let dataSorted = this.sortItems(data)
    this.parodyItemsAdditional.next(dataSorted);
    this.currentParodyItemsAdditional = dataSorted;
  }
  sortItems(items: Item[]): Item[] {
    return items.sort((n1, n2) => n1.idPosition - n2.idPosition)
  }
}
