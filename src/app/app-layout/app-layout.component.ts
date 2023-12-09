import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  constructor(private service : AppService = Inject(AppService)){
    
  }
  username$ = this.service.username
  isLoggedOn$ = this.service.isLoggedOnn
  role$ = this.service.role

  logout(){
    localStorage.removeItem("access_token")
    this.service.isLoggedOnn.next(false)
    this.service.username.next("")
    this.service.role.next("")

  }

}
