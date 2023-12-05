import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDTO } from '../../interfaces/member-dto';
import { MemberSearchDTO } from '../../interfaces/member-search-dto';
import { AppService } from '../../app.service';
import { MemberListComponent } from '../member-list/member-list.component';
import { MemberSearchComponent } from '../member-search/member-search.component';
import { MemberAddEditComponent } from '../member-add-edit/member-add-edit.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BorrowingListComponent } from '../../borrowings/borrowing-list/borrowing-list.component';

@Component({
  selector: 'app-member-container',
  standalone: true,
  imports: [CommonModule, MemberListComponent, MemberSearchComponent, MemberAddEditComponent, BorrowingListComponent],
  templateUrl: './member-container.component.html',
  styleUrl: './member-container.component.css'
})
export class MemberContainerComponent {
  mode:string = "search"
  selectedMember?: MemberDTO
  members?:MemberDTO[]
  errors?:HttpErrorResponse
  currentSearchCriteria: MemberSearchDTO ={}
  constructor( private service : AppService){}
  /*
  This is a function that first checks for id in the search criteria
  and if null then checks successively for email or name and adapts the call to the service accordingly. 
  Since the get method from the 
  api returns a single object when searching for email or id and a list when searching
  for name and the list component accepts the data as a list, we make different 
  processing of the received data for the two cases
*/
  searchMembers(criteria: MemberSearchDTO){
    this.currentSearchCriteria = criteria
    this.members =[]
    let pathparameter:string = ""
    if(criteria.id || criteria.email){
      if(criteria.id) pathparameter = `${criteria.id}`
      else pathparameter = `email/${criteria.email}`
      this.service.getMember(pathparameter).subscribe({
        next: (result)=>{
          this.members?.push(result)
        },
        error: (err)=>{
          this.errors = err
        }
      })
     }else {
       if(criteria.name) pathparameter = `?name=${criteria.name}`
       this.service.getMembers(pathparameter).subscribe({
        next: (result)=>{
          this.members = result
        },
        error: (err)=>{
          this.errors = err
       }
     })
    }
  }
  /*
  The function clears the selected member that will be shown in the add-edit component and changes the mode to 'edit'
  so that this component will be shown
  */
  AddClick(){
    this.selectedMember = undefined;
    this.mode='edit'
  }
  /*
  The function finds the selected member that will be shown in the add-edit component and changes the mode to 'edit'
  so that this component will be shown
  */

  UpdateClick(id:number){
    this.service.getMember(`${id}`).subscribe({
      next: (result)=>{
        this.selectedMember = result;
        this.mode="edit"
      },
      error: (err)=>{
        this.errors = err
      }
    })

  }
/*The function receives the AddSubmit event of the Add-Edit-Component and decides
 if the desired function is update or add and routes the data accordingly
*/
  AddOrUpdate(member: MemberDTO){
    if(this.selectedMember) this.UpdateMember(member)
    else this.AddMember(member)
  }

  AddMember(member: MemberDTO){
    this.service.addMember(member).subscribe({
      next: (next) =>{
          this.searchMembers(this.currentSearchCriteria)
          this.errors = undefined
          this.mode = "search"
      },
      error: (err)=>{
        this.errors = err
      }
    })
  }

  UpdateMember(member: MemberDTO){
    this.service.updateMember(member).subscribe({
      next: (result)=>{
        this.searchMembers(this.currentSearchCriteria)
        this.errors = undefined
        this.mode = "search"
      },
      error: (err)=>{
        this.errors = err
      }
    })
  }

  Delete(id: number){
    this.service.deleteMember(id).subscribe({
      next: (result)=>{
        this.searchMembers(this.currentSearchCriteria)
      },
      error: (err)=>{
        this.errors = err
      }
    })
  }
  ReturnToList(){
    this.errors =undefined
    this.mode="search"
  }

  ShowHistory(id?:number){
    if(id && this.members){
      this.selectedMember = this.members.find(a => a.id == id)
      console.log("!")
      console.log(this.selectedMember)
      this.mode = 'history'
    }
  }

}
