import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> { // todo: добавить интерфейс
    return this.http.get<any>(`${environment.apiUrl}/getAll`, {

    })
  }

  public addBalletShowItems(data: any): Observable<any> { // todo: добавить интерфейс
    return this.http.post<any>(`${environment.apiUrl}/addBalletShowItems`, {
      data
    })
  }

  /**
   * Отправить файл на сервер
   * @param $event
   * @param formHtml
   */
  public saveFile($event: Event, formHtml: HTMLFormElement): Promise<any> { // todo: добавить интерфейс
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
