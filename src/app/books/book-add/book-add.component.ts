import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookInsertDTO } from '../../interfaces/book-insert-dto';
import { CategoryShowDTO } from '../../interfaces/category-show-dto';
import { BookUpdateDTO } from '../../interfaces/book-update-dto';


@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})


export class BookAddComponent {
  @Input() book?: BookUpdateDTO
  // get book():BookUpdateDTO|undefined{
  //   return this._book;
  // }
  // set book(book:BookUpdateDTO|undefined){
  //   if(book){
  //     this.form.patchValue(book);
  //   }
  //   else{
  //     this.form.reset
  //   }
  // }

  form = new FormGroup({
    id: new FormControl<number|null>(0),
    isbn: new FormControl(""),
    title: new FormControl(""),
    description: new FormControl(""),
    categoryId: new FormControl(1),
    position: new FormControl(""),
    author: new FormControl("")
  })
  @Output() addSubmit = new EventEmitter<BookUpdateDTO>();
  @Output() cancelClick = new EventEmitter();
  @Input() categories?: CategoryShowDTO[];
 
    
  

 
  errors?: string

  onSubmit(){
    this.addSubmit.emit(this.form.value as BookUpdateDTO)

  }

  onCancel(){
    this.cancelClick.emit()
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes['book'].currentValue){
       this.form.patchValue(changes['book'].currentValue)
       console.log("changes registered")
      
    }
  }

  

}
