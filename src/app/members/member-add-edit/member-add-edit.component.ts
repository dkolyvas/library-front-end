import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDTO } from '../../interfaces/member-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-member-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './member-add-edit.component.html',
  styleUrl: './member-add-edit.component.css'
})
export class MemberAddEditComponent {

  @Output() addMember = new EventEmitter<MemberDTO>();
  @Output() cancel = new EventEmitter();
  @Input() member?: MemberDTO;

form = new FormGroup({
  id: new FormControl<number>(0),
  firstname: new FormControl(''),
  lastname: new FormControl(''),
  email: new FormControl(''),
  phone: new FormControl(''),
  address: new FormControl('')
  
})
addClick(){
  this.addMember.emit(this.form.value as MemberDTO)
}
cancelClick(){
  this.cancel.emit()
}

ngOnChanges(changes: SimpleChanges):void{
  if(changes['member'].currentValue){
    this.form.patchValue(changes['member'].currentValue)
  }
}

}
