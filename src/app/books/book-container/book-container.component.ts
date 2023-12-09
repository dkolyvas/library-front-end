import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';
import { BookSearchDTO } from '../../interfaces/book-search-dto';
import { BookShowDTO } from '../../interfaces/book-show-dto';
import { BookSearchComponent } from '../book-search/book-search.component';
import { BookListComponent } from '../book-list/book-list.component';
import { CategoryShowDTO } from '../../interfaces/category-show-dto';
import { BookAddComponent } from '../book-add/book-add.component';
import { BookInsertDTO } from '../../interfaces/book-insert-dto';
import { BookUpdateDTO } from '../../interfaces/book-update-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { BorrowingListComponent } from '../../borrowings/borrowing-list/borrowing-list.component';


@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [CommonModule, BookSearchComponent, BookListComponent, BookAddComponent, BorrowingListComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {
 
  constructor(private service : AppService ){ }
  bookList? :BookShowDTO[]
  selectedBook?: BookUpdateDTO;
  errors?: HttpErrorResponse;
  selectedFunction: string= "search";
  categories?: CategoryShowDTO[];
  // f
  searchCriteria:BookSearchDTO={}
  

  Search(criteria: BookSearchDTO){
    this.bookList =[]
    this.searchCriteria = criteria
    this.service.searchBooks(criteria).subscribe({
      next: (results)=> {
    
        this.bookList = results
        console.log(this.bookList);
      },
      error:(err)=>{
        this.errors = err
      }
    })

    
  }
  SearchError(error:any){
    this.errors = error
  }

  ngOnInit(){
    this.service.getCategories().subscribe({
        next: (catList)=>{
          this.categories = catList;
        },
        error: (err)=>{
          this.errors = err
        }
    });

   
  }
  setAdd(){
      this.selectedBook = undefined;
      this.selectedFunction="edit"

      console.log('event emitter')
    
  }

  addOrUpdate(book:BookUpdateDTO){
    if(!this.selectedBook) this.addBook(book)
    else this.updateBook(book)
  }



  addBook(book: BookUpdateDTO){
    this.service.addBook(book).subscribe({
      next: (body)=>{
          //this.clearForm = true;
          this.Search(this.searchCriteria);
          this.errors = undefined
          this.selectedFunction = "search";
          //this.clearForm = false;
      },
      error: (err)=>{
        this.errors = err
        
      }

    })
  }

  //The function gets a BookShowDTO object from the api with the get method
  //Since we must submit to the book-add form a BookUpdateDTO we must convert
  // the BookShowDTO to a BookUpdateDTO object

  selectBookToUpdate(id:number){
    let readOnlyBokk:BookShowDTO|undefined 
    
    this.service.getBook(id).subscribe({
      next:(result)=>{
        this.selectedBook=this.mapToUpdateDTO(result)
        this.selectedFunction="edit"
        console.log(this.selectedBook)
        
        
      },
      error: (err)=>{
        this.errors = err
      }
    })
    

    }
    
  
  returnToList(){
    //this.clearForm = true;
    this.selectedBook = undefined
    console.log("return selected")
    this.selectedFunction = "search"
    this.errors = undefined
    //this.clearForm = false;
  }

  updateBook(book: BookUpdateDTO){
    this.service.updateBook(book, book.id).subscribe({
      next:(result)=>{
        this.Search(this.searchCriteria);
        this.selectedFunction="search";
        this.selectedBook = undefined;
        this.errors = undefined;
      },
      error:(err)=>{
        this.errors = err
        console.log(err)
      }

    })

  }
  deleteBook(id:number){
    this.service.deleteBook(id).subscribe({
      next: (result)=>{
        this.Search(this.searchCriteria)
      },
      error: (err)=>{
        this.errors = err
      }
    })

  }
  
  showBorrowingHistory(id?: number){
    if(id &&this.bookList){
      let currentBook = this.bookList.find(a => a.id == id)
      this.selectedBook = this.mapToUpdateDTO(currentBook)
      console.log(this.selectedBook)
      this.selectedFunction = "history"
      this.ngOnInit()
    }

  }

  mapToUpdateDTO(showDTO?: BookShowDTO){
    let updateDTO: BookUpdateDTO = {
      id: showDTO?.id,
      title: showDTO?.title,
      isbn: showDTO?.isbn,
        description: showDTO?.description,
        categoryId: showDTO?.categoryId,
        position: showDTO?.position,
        author: showDTO?.author
    }
    return showDTO
  }

}
