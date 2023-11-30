import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public mainPagePhoto$ = new Subject<string>();
  public changeMainPagePhoto(newPhoto: string) {
    this.mainPagePhoto$.next(newPhoto);
  }
}
