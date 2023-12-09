import { Inject, Injectable } from "@angular/core";
import { AppService } from "./app.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class Authguard {
    constructor(
        private service: AppService = Inject(AppService),
        private jwtHelpder: JwtHelperService = Inject(JwtHelperService),
        private router: Router){}

    canActivate(){
        if(this.service.isLoggedOnn && 
            !this.jwtHelpder.isTokenExpired(localStorage.getItem("access_token"))){
            return true
        }else{
            this.router.navigate(['/login'])
            return false
        }
    }




}

