import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public mainText$ = new Subject<{mainText_ua: string; mainText_en: string }>();
  public changeMainText$(newText: {mainText_ua: string; mainText_en: string }) {
    this.mainText$.next(newText);
  }
}
