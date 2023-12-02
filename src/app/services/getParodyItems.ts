import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Item} from "../../interfaces/Item";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class ParodyItemsService {
  private parodyItems = new Subject<Item[]>();
  public parodyItems$ = this.parodyItems.asObservable();
  public currentParodyItems?: Item[];
  public changeParodyItems(data: Item[]) {
    this.parodyItems.next(data);
    this.currentParodyItems = data;
  }
}
