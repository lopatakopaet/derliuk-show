import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Получить все данные с табл номеров баллета
   */
  public getBalletShowItems(): Observable<any> { // todo: добавить интерфейс
    return this.http.get<any>(`${environment.apiUrl}/getBalletShowItems`, {

    })
  }

  /**
   * Получить номер баллета по id
   * @param id
   */
  public getBalletShowItem(id: string | number): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/getBalletShowItem`, {
      id
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

  /**
   * Отправить файл на сервер
   * @param $event
   * @param formHtml
   */
  // public saveFile($event: Event, formHtml: HTMLFormElement): Promise<any> { // todo: добавить интерфейс
  public saveFile(formHtml: HTMLFormElement): Promise<any> { // todo: добавить интерфейс
    /** @type {HTMLFormElement} */
    const form: HTMLFormElement | null = formHtml;
    const url = new URL(form?.action);
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
}
