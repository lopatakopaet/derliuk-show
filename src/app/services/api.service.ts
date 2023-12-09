import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Item} from "../../interfaces/Item";
import {Gallery} from "../../interfaces/Gallery";
import {BalletPage} from "../../interfaces/BalletPage";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public adminLogin(data: {user: string; pass: string}): Observable<any> {
      // let headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': btoa(`Basic ${data.user}:${data.pass}`)
      // });
    return this.http.post<any>(`${environment.apiUrl}/adminLogin`, {
      data
    })
  }


  // СТРАНИЦА БАЛЕТ/ПАРОДИИ

  public getMainPage(tableName: string | number): Observable<any> { // todo: добавить интерфейс
    return this.http.get<any>(`${environment.apiUrl}/getMainPage`, {
      params: {
        tableName
      }
    })
  }

  public changeMainPage(data: {tableName: string; data: BalletPage }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/changeMainPage`, {
      data
    })
  }

  // СТРАНИЦА БАЛЕТ конец

  /**
   * Получить все данные с табл номеров балета
   */
  public getMostPopularItems(tableName: string | number): Observable<Item[]> { // todo: добавить интерфейс
    return this.http.get<Item[]>(`${environment.apiUrl}/getMostPopularItems`, {
      params: {
        tableName
      }
    })
  }

  /**
   * Получить номер баллета по id
   * @param id
   */
  public getBalletShowItem(tableName: string, id: string | number): Observable<any> { // todo: добавить интерфейс
    return this.http.get<any>(`${environment.apiUrl}/getBalletShowItem`, {
      params: {
        tableName,
        id
      }

    })
  }

  public addBalletShowItem(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/addBalletShowItem`, {
      data
    })
  }

  public changeBalletShowItem(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/changeBalletShowItem`, {
      data
    })
  }

  public deleteItem(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/deleteItem`, {
      data
    })
  }

  public deleteAndChangePositionItem(tableName: string, id: number): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/deleteAndChangePositionItem`, {
      data: {
        tableName,
        id
      }
    })
  }

  public changeItemPosition(tableName: string, item: Item, newPosition: number): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/changeItemPosition`, {
      data: {
        tableName,
        item,
        newPosition
      }
    })
  }

  // public changeItemPosition(tableName: string, item: Item, newPosition: number): Observable<any> { // todo: добавить интерфейс
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': btoa(`Basic 'admin':'password'`)});
  //   return this.http.post<any>(`${environment.apiUrl}/changeItemPosition`, {
  //       data: {
  //         tableName,
  //         item,
  //         newPosition
  //       }
  //     } ,
  //     {
  //       headers: headers
  //     }
  //   )
  // }

  // СТРАНИЦА КОНТАКТЫ
  public getContacts(): Observable<any> { // todo: добавить интерфейс
    return this.http.get<any>(`${environment.apiUrl}/getContacts`, {

    })
  }

  public addContacts(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/addContacts`, {
      data
    })
  }

  public changeContacts(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/changeContacts`, {
      data
    })
  }

  // СТРАНИЦА КОНТАКТЫ КОНЕЦ

  // СТРАНИЦА ГАЛЕРЕЯ
  public getGallery(): Observable<Gallery[]> { // todo: добавить интерфейс
    return this.http.get<any>(`${environment.apiUrl}/getGalleryItems`, {

    })
  }
  public addGalleryItem(data: {photo: string; idPosition: number}): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/addGalleryItem`, {
      data
    })
  }

  public changeGalleryItem(data: Gallery): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/changeGalleryItem`, {
      data
    })
  }
  public changeGalleryItemPosition(data: Gallery[]): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/changeGalleryItemPosition`, {
      data
    })
  }
  public deleteGalleryItem(id: string | number): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/deleteGalleryItem`, {
      id
    })
  }
  // СТРАНИЦА ГАЛЕРЕЯ КОНЕЦ

  // СТРАНИЦА РАЙДЕР
  public getRiderData(): Observable<any> { // todo: добавить интерфейс
    return this.http.get<any>(`${environment.apiUrl}/getRiderData`, {

    })
  }

  public addRiderData(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/addRiderData`, {
      data
    })
  }

  public changeRiderData(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/changeRiderData`, {
      data
    })
  }
  // СТРАНИЦА РАЙДЕР КОНЕЦ

  /**
   * Отправить файл на сервер
   * @param $event
   * @param formHtml
   */
  // public saveFile($event: Event, formHtml: HTMLFormElement): Promise<any> { // todo: добавить интерфейс
  public saveFile(formHtml: HTMLFormElement): Promise<any> { // todo: добавить интерфейс
    /** @type {HTMLFormElement} */
    const form: HTMLFormElement | null = formHtml;
    const url = new URL(environment.apiUrl + '/upload');
    const formData = new FormData(form);
    // @ts-ignore
    const searchParams = new URLSearchParams(formData);

    /** @type {Parameters<fetch>[1]} */
    const fetchOptions = {
      method: form.method, body: undefined
    };

    if (form.method.toLowerCase() === 'post') {
      if (form.enctype === 'multipart/form-data') {
        // @ts-ignore
        fetchOptions.body = formData;
      } else {
        // @ts-ignore
        fetchOptions.body = searchParams;
      }
    } else {
      // @ts-ignore
      url.search = searchParams;
    }
    return fetch(url, fetchOptions)
      .then(response => response.json())
    // return this.http.post<any>(`${environment.apiUrl}/upload`, {
    //   formData
    // })
  }
  public deleteFile(data: {filePath: string}): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/deleteFile`, {
      data
    })
  }
}
