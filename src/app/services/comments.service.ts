import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Comment} from "../../interfaces/Comment";
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  public comments$ = new Subject<Comment[]>();
  public comments?: Comment[];
  public changeComments$(data: Comment[]) {
    console.log(this.comments$);
    this.comments$.next(data);
    this.comments = data;
  }
}
