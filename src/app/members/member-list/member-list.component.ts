import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDTO } from '../../interfaces/member-dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  @Input() members?: MemberDTO[] 
  @Input() borrowingMode?: boolean
  @Output() updateSubmit = new EventEmitter<number>()
  @Output() deleteSubmit = new EventEmitter<number>()
  @Output() historySubmit = new EventEmitter<number>()
  @Output() subscriptionsSubmit = new EventEmitter<number>()

  selectMember(id?: number){
    this.updateSubmit.emit(id)
  }
  
  delete(id?:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.deleteSubmit.emit(id)
    }
  }

  history(id?:number){
    this.historySubmit.emit(id)
  }

  subscriptions(id?: number){
    this.subscriptionsSubmit.emit(id)
  }


  

}
