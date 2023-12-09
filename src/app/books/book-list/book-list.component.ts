import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookShowDTO } from '../../interfaces/book-show-dto';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  @Input() books?: BookShowDTO[];
  @Input() borrowingMode?: boolean
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onHistory = new EventEmitter<number>();

  selectEdit(id:number){
    this.onEdit.emit(id);
  }
  selectDelete(id:number){
    if(confirm("Are you sure?")){
      this.onDelete.emit(id);
    }
  }
  selectHistory(id:number){
    this.onHistory.emit(id);
  }
  


}
