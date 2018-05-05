
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';



@Injectable()
export class HttpINterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        token = token ? token : '';
        const authReq = req.clone({
            headers: req.headers.set('authorization', token)
        });
        return next.handle(authReq)
            .catch((error, caught) => {
                // intercept the respons error and displace it to the console

                // console.log('Error Occurred', error);

                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
