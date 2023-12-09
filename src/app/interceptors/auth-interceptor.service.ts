import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hash = this.authService.getHash();
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Basic ${hash}`),
    });
    return next.handle(modifiedReq);
  }

}
