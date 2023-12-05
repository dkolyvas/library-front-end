import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  

}
