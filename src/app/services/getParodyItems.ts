import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Item} from "../../interfaces/Item";

@Injectable({
  providedIn: 'root',
})
export class ParodyItemsService {
  private parodyItems = new Subject<Item[]>();
  public parodyItems$ = this.parodyItems.asObservable();
  public currentParodyItems?: Item[];
  public changeParodyItems(data: Item[]) {
    let dataSorted = this.sortItems(data)
    this.parodyItems.next(dataSorted);
    this.currentParodyItems = dataSorted;
  }
  sortItems(items: Item[]): Item[] {
    return items.sort((n1, n2) => n1.idPosition - n2.idPosition)
  }
}
