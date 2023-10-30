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
}
