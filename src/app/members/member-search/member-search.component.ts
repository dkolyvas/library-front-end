import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberSearchDTO } from '../../interfaces/member-search-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './member-search.component.html',
  styleUrl: './member-search.component.css'
})
export class MemberSearchComponent {
  @Output() searchSubmit= new EventEmitter<MemberSearchDTO>()
  @Output() addSubmit = new EventEmitter()
  @Input() borrowingMode: boolean = false
  
  form = new FormGroup({
    id: new FormControl<number|null>(null),
    email: new FormControl<string|null>(""),
    name: new FormControl<string|null>("")

  });

  search(){
    this.searchSubmit.emit(this.form.value as MemberSearchDTO)
  }

  addnew(){
    this.addSubmit.emit()
  }

}
