import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor {

  constructor(private _AuthService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes("spotify.com")) {
      // clone the request and use the "setHeaders" property to set an "Authorization" header, etc.
          // Clone the existing request, and add the authorization header
          req = req.clone({
            setHeaders: {
            Authorization: `JWT ${this._AuthService.getToken()}`
        }
      });
      // Pass the request on to the next handler
      
     }
    return next.handle(req);
  }
}
