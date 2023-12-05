import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request :HttpRequest<any>,next: HttpHandler ): Observable<HttpEvent<any>>{
        const access_token  = localStorage.getItem("access_token")
        if(access_token){
            let clonedReq = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + access_token)
            })
            console.log("Bearer " + access_token)
            return next.handle(clonedReq)
        }
        else{
            return next.handle(request)
            console.log("No header")
        }
    }
}
