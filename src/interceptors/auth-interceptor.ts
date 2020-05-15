import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';
import { APIConfig } from 'src/config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storageService.getLocalUser();

        let N = APIConfig.baseURL.length;
        let requestToAPI = req.url.substring(0, N) == APIConfig.baseURL;

        // Só envia o cabeçalho se for uma requisição para a API do Spring
        if(localUser && requestToAPI) {
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token )});
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};