import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';
import { UserUpdateDTO } from '../../interfaces/user-update-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  user?: UserUpdateDTO
  editName: boolean = false
  editPassword: boolean = false
  error: any
  

  constructor(private service: AppService = Inject(AppService)){ 
  }

  form = new FormGroup({
    username: new FormControl<string>(''),
    oldPassword: new FormControl<string|undefined>(''),
    newPassword: new FormControl<string|undefined>(undefined),
    confirmPassword: new FormControl<string|undefined>(undefined),
    name: new FormControl<string|undefined>(undefined),
    surname: new FormControl<string|undefined>(undefined)
  })


  loadData() {
    if(this.service.role.getValue() !="admin"){
      let userData = this.service.getUser(this.service.username.getValue() ).subscribe({
        next: (data)=>{
          console.log(data)
          this.user = {
            username: data.username,
            name: data.name,
            surname : data.surname
          }
          console.log(this.user)
          this.form.patchValue(this.user)
          this.error = undefined
        },
        error: (err)=>{
          this.error = err

        }
      })
    }
  }

  updateUser(){
    this.service.updateUser(this.form.value as UserUpdateDTO).subscribe({
      next: (data)=>{
        this.loadData()
        this.editName = false
        this.editPassword = false
        this.error = undefined
      },
      error: (err)=>{
        this.error = err
      }
    })
  }

  cancelChanges(){
    this.editName = false
    this.editPassword = false
    this.error = undefined
    this.form.reset()
    this.loadData()
  }

  toggleEditName(){
    this.editName = !this.editName
  }

  toggleEditPassword(){
    this.editPassword = !this.editPassword
    
  }

  ngOnInit(){
    this.loadData()
  }

}
