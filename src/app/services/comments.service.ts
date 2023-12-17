import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Comment} from "../../interfaces/Comment";
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  public comments$ = new Subject<Comment[]>();
  public changeComments$(data: Comment[]) {
    this.comments$.next(data);
  }
}
