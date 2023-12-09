import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';
import { MemberDTO } from '../../interfaces/member-dto';
import { BookShowDTO } from '../../interfaces/book-show-dto';
import { BookSearchDTO } from '../../interfaces/book-search-dto';
import { MemberSearchDTO } from '../../interfaces/member-search-dto';
import { BorrowingInsertDTO } from '../../interfaces/borrowing-insert-dto';
import { BorrowingShowDTO } from '../../interfaces/borrowing-show-dto';
import { BookSearchComponent } from '../../books/book-search/book-search.component';
import { BookListComponent } from '../../books/book-list/book-list.component';
import { MemberSearchComponent } from '../../members/member-search/member-search.component';
import { MemberListComponent } from '../../members/member-list/member-list.component';
import { CategoryShowDTO } from '../../interfaces/category-show-dto';

@Component({
  selector: 'app-borrowing-form',
  standalone: true,
  imports: [CommonModule, BookSearchComponent, BookListComponent, MemberSearchComponent, MemberListComponent],
  templateUrl: './borrowing-form.component.html',
  styleUrl: './borrowing-form.component.css'
})
export class BorrowingFormComponent {
  constructor(private service:AppService = Inject(AppService)){}

  memberList?: MemberDTO[]
  selectedMember?: MemberDTO
  bookList?: BookShowDTO[]
  selectedBook?: BookShowDTO
  errors: any
  successfullBorrowing?: boolean
  categoriesList?: CategoryShowDTO[]

  SearchBooks(criteria: BookSearchDTO){
    this.bookList =[]
    this.errors = undefined
    this.successfullBorrowing = false
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

  SearchMembers(criteria: MemberSearchDTO){
    this.successfullBorrowing = undefined
    this.errors = undefined
    this.successfullBorrowing = false
    this.memberList =[]
    let pathparameter:string = ""
    if(criteria.id || criteria.email){
      if(criteria.id) pathparameter = `${criteria.id}`
      else pathparameter = `email/${criteria.email}`
      this.service.getMember(pathparameter).subscribe({
        next: (result)=>{
          this.memberList?.push(result)
        },
        error: (err)=>{
          this.errors = err
        }
      })
     }else {
       if(criteria.name) pathparameter = `?name=${criteria.name}`
       this.service.getMembers(pathparameter).subscribe({
        next: (result)=>{
          this.memberList = result
        },
        error: (err)=>{
          this.errors = err
       }
     })
    }
  }
/*
The method checks for the availability of the book and if true then makes it selectedBook
*/
  SelectBook(id: number){
    if(this.bookList){
      let bookFound = this.bookList.find(a => a.id == id)
      if(bookFound?.available) {
        this.selectedBook = bookFound
        this.errors = undefined
      }
      else this.errors = "The book is not available at the moment"
    }
  }
/*
  The method asks the API if the selected member can borrow and if yes makes it the selectedMemebr 
*/
  SelectMember(id: number){
    this.service.checkCanBorrow(id).subscribe({
      next: (data)=>{
        if(this.memberList){
          this.errors = undefined
          this.selectedMember = this.memberList.find(a => a.id == id)
        }

      }, 
      error: (err)=>{
        this.errors = err
      }
    })
   
  }

  ResetForm(){
    this.selectedBook = undefined
    this.selectedMember = undefined
    this.memberList = undefined
    this.bookList = undefined
  }

  Borrow(){
    if(this.selectedBook?.id && this.selectedMember?.id){
      let submitData: BorrowingInsertDTO  = {
        memberId : this.selectedMember.id,
        bookId : this.selectedBook.id
      }
      this.service.borrowBook(submitData).subscribe({
        next: (data) =>{
          this.successfullBorrowing =true
          this.ResetForm()
        },
        error: (err)=>{
          this.errors = err
        }
      })
    }

  }
  
  ngOnInit(){
    this.service.getCategories().subscribe({
      next: (catList)=>{
        this.categoriesList = catList;
      },
      error: (err)=>{
        this.errors = err
      }
  });
  }
  
  

}
