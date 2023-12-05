import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app.service';
import { SecurityToken } from '../../interfaces/security-token';
import { Credentials } from '../../interfaces/credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  token?: SecurityToken
  error: any
  

  form = new FormGroup({
    username: new FormControl<string>(""),
    password : new FormControl<string>("")
  })
  constructor(private service: AppService = Inject(AppService),
    private JwtHelper: JwtHelperService = Inject(JwtHelperService),
    private router: Router = Inject(Router)
  ){
    
  }

  login(){
    this.service.login(this.form.value as Credentials).subscribe({
      next: (data)=>{
        localStorage.setItem("access_token", data.key)
        console.log(data)
       // localStorage.setItem("access_token", data.token)
        const  decodedToken = this.JwtHelper.decodeToken(data.key)
        console.log(decodedToken)
        this.service.isLoggedOnn.next(true)
        this.service.username.next(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
        this.service.role.next(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    
        this.router.navigate(['/home'])

      },
      error: (err)=>{
        this.error = err
      }

    })

  }

}
