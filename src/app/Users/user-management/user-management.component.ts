import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';
import { UserShowDTO } from '../../interfaces/user-show-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterDTO } from '../../interfaces/user-register-dto';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  constructor(private service: AppService = Inject(AppService)){}

  userList? :UserShowDTO[]
  error: any
  showForm: boolean = false

  form = new FormGroup({
    username: new FormControl<string>(""),
    password : new FormControl<string>(""),
    confirmPassword: new FormControl<string>(""),
    name : new FormControl<string|undefined>(undefined),
    surname: new FormControl<string|undefined>(undefined)
  })

  loadUsers(){
    this.service.getAllUsers().subscribe({
      next: (data)=>{
        this.userList = data
      },
      error: (err)=>{
        this.error = err
      }
    })
  }

  ngOnInit(){
    this.loadUsers()
  }

  showRegistrationForm(){
    this.showForm = true
  }

  registerUser(){
    this.service.registerUser(this.form.value as UserRegisterDTO).subscribe({
      next: (data)=>{
        this.loadUsers()
        this.showForm = false
        this.form.reset()
      },
      error : (err)=>{
        this.error = err
      }
    })

  }

  cancelRegistration(){
    this.showForm = false
    this.form.reset()
  }

  deleteUser(id: number){
    this.service.deleteUser(id).subscribe({
      next: (data)=>{
        this.loadUsers()
      },
      error : (err) =>{
        this.error = err
      }
    })
  }



}
