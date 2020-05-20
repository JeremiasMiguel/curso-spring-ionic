import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService, public alertController: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
     
        return next.handle(req)
                .pipe(
                    catchError(error => {
                        let errorObj = error;
                        if(errorObj.error ){
 
                           errorObj = errorObj.error;
                        }
                        if(!errorObj.status){
                            errorObj = JSON.parse(errorObj.error);
                        }
                        console.log("Erro detectado pelo interceptor: ");
                        console.log(errorObj);

                        switch(errorObj.status) {
                            case 401:
                                this.handle401();
                                break;
                            case 403:
                                this.handle403();
                                break;
                            default:
                                this.handleDefaultError(errorObj);
                        }
                       
                        return Observable.throw(errorObj);
                    })) as any;
    }

    async handle401() {
        const alert = await this.alertController.create({
            header: 'Erro 401: falha de autenticação',
            message: 'Email e/ou senha incorretos',
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        await alert.present();
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }

    async handleDefaultError(errorObj) {
        const alert = await this.alertController.create({
            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        await alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};