import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, RouterLink } from '@angular/router';
import { AppService } from '../../app.service';
import { MemberDTO } from '../../interfaces/member-dto';
import { Observable, switchMap } from 'rxjs';
import { SubscriptionShowDTO } from '../../interfaces/subscription-show-dto';
import { SubscriptionTypeShowDTO } from '../../interfaces/subscription-type-show-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionInsertDTO } from '../../interfaces/subscription-insert-dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subscription-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './subscription-container.component.html',
  styleUrl: './subscription-container.component.css'
})
export class SubscriptionContainerComponent {
  @Input() member?: MemberDTO
  subscriptions?: SubscriptionShowDTO[]=[]
  currentSubscription?: SubscriptionShowDTO
  booksBorrowed?: number
  subscTypes?: SubscriptionTypeShowDTO[]
  editMode: boolean = false
  error:any
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppService
  ){}

  form = new FormGroup({
    memberId : new FormControl<number|undefined>(0),
    replaceOld: new FormControl<boolean>(false),
    subscriptionType: new FormControl<number>(0)
  })
  

  ngOnInit(){
    const id =this.route.snapshot.paramMap.get('id');
    this.service.getMember(id).subscribe({
      next: (result)=>{
        this.member = result
      },
      error: (err)=>{
        console.log(err)
        this.error = err
      }
    

    })
    this.loadSubscriptions(id)

    this.service.getSubscTypes().subscribe({
      next: (result)=>{
        this.subscTypes = result
      },
      error: (err)=>{
        console.log(err)
        this.error = err
      }
      
    })
   

  }

  loadSubscriptions(id:string|null){
    this.subscriptions = []
    this.currentSubscription= undefined
       
    this.service.getSubscriptions(id).subscribe({
      next: (results)=>{
        for(let result of results){
          let item = new SubscriptionShowDTO(result)
          this.subscriptions?.push(item)
        }
        this.subscriptions?.sort((a, b)=>a.startDate.valueOf()- b.startDate.valueOf())
      },
      error: (err)=>{
        console.log(err)
        this.error = err
      }
    })
    this.service.getCurrentSubscription(id).subscribe({
      next: (result)=>{
        this.currentSubscription = new SubscriptionShowDTO(result)
      },
      error: (err)=>{
        console.log(err)
        this.error = err
      }
    })
    this.service.getBorrowedBooks(id).subscribe({
      next: (result)=>{
        this.booksBorrowed = result
      },
      error: (err)=>{
        console.log(err)
      }
    })
   
  }

  showAdd(){
    if(this.member){
      this.form.controls.memberId.setValue(this.member.id)
      this.editMode = true
    }
  }

  cancelAdd(){
    this.editMode = false
    this.form.reset()
  }

  stopSubscription(){
    this.service.stopSubscription(this.currentSubscription?.id).subscribe({
      next: (data)=>{
        if(this.member){
          this.loadSubscriptions(`${this.member.id}`)
        }
      },
      error: (err)=>{
        console.log(err)
        this.error = err
      }
    })
  }

  addSubscription(){
    this.service.addSubscription(this.form.value as SubscriptionInsertDTO).subscribe({
      next: (data)=>{
        if(this.member){
          this.loadSubscriptions(`${this.member.id}`)
          this.editMode = false
          this.form.reset()
        }
        
        },
        error: (err)=>{
          console.log(err)
          this.error = err
      }
    })
  }

  




}
