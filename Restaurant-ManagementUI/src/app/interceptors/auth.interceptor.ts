import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.auth.currentUserValue;
        const isLoggedIn = currentUser && currentUser['token'];
        const isApiUrl = request.url.startsWith(environment.baseUrl);
         
        if (isLoggedIn && isApiUrl) {
        
            request = request.clone({
              headers: request.headers.set("Authorization","Bearer " + currentUser['token'])
            });  
    return next.handle(request);
  }
  else {
    return next.handle(request)
}
}
}
