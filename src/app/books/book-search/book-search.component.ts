import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookSearchDTO } from '../../interfaces/book-search-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryShowDTO } from '../../interfaces/category-show-dto';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css'
})

export class BookSearchComponent {
  @Output() searchSubmit= new EventEmitter<BookSearchDTO>();
  @Output() addSubmit = new EventEmitter();
  @Input() borrowingMode: boolean = false

  @Input() categories?: CategoryShowDTO[];
  
  constructor(private service: AppService = inject(AppService)){}

  form = new FormGroup({

    title: new FormControl(""),
    author : new FormControl(""),
    category: new FormControl(null),
    isbn : new FormControl('')
  })

  
    submitForm(){
        this.searchSubmit.emit(this.form.value as BookSearchDTO);
    }

    onAdd(){
      console.log("button clicked")
      this.addSubmit.emit()
    }

 }

  




