
import { Inject, Injectable, inject } from '@angular/core';
import { CategoryShowDTO } from './interfaces/category-show-dto';
import { BookSearchDTO } from './interfaces/book-search-dto';
import { BookShowDTO } from './interfaces/book-show-dto';
import { HttpClient } from '@angular/common/http';
import { BookInsertDTO } from './interfaces/book-insert-dto';
import { BookUpdateDTO } from './interfaces/book-update-dto';
import { MemberDTO } from './interfaces/member-dto';
import { SubscriptionRawDTO } from './interfaces/subscription-raw-dto';
import { SubscriptionTypeShowDTO } from './interfaces/subscription-type-show-dto';
import { SubscriptionInsertDTO } from './interfaces/subscription-insert-dto';
import { BorrowingRawDTO } from './interfaces/borrowing-raw-dto';
import { BorrowingInsertDTO } from './interfaces/borrowing-insert-dto';
import { Credentials } from './interfaces/credentials';
import { SecurityToken } from './interfaces/security-token';
import { BehaviorSubject } from 'rxjs';
import { UserShowDTO } from './interfaces/user-show-dto';
import { UserRegisterDTO } from './interfaces/user-register-dto';
import { UserUpdateDTO } from './interfaces/user-update-dto';
const APIPATH:string = "https://localhost:5001/api"

@Injectable({
  providedIn: 'root',
})
export class AppService {
  isLoggedOnn = new BehaviorSubject<boolean>(false)
  username = new BehaviorSubject<string>('')
  role = new BehaviorSubject<string>('')
  

  constructor(private http:HttpClient ) { }

  getCategories(){
     return this.http.get<CategoryShowDTO[]>(`${APIPATH}/Categories`)
  }

  deleteCategory(id?: number){
    return this.http.delete(`${APIPATH}/Categories/${id}`)
  }
  updateCategory(data: CategoryShowDTO){
    return this.http.put<CategoryShowDTO>(`${APIPATH}/Categories/${data.id}`, data)
  }
  addCategory(data?: CategoryShowDTO){
    return this.http.post<CategoryShowDTO>(`${APIPATH}/Categories`, data)
  }

  searchBooks(criteria: BookSearchDTO){
    let queryString:string ="";
    let hasPrevious: boolean = false;
    console.log(criteria);

    if(criteria){
      queryString += "?"
    
      if(criteria.author){
        queryString += "author=" + criteria.author;
        hasPrevious = true;
      }
      if(criteria.title){
        if(hasPrevious) queryString +="&";
        queryString +="title=" + criteria.title;
        hasPrevious = true
      }
      if(criteria.category){
        if(hasPrevious) queryString += "&";
        queryString +="category=" + criteria.category;
        hasPrevious = true;
      }
      if(criteria.isbn){
        if(hasPrevious) queryString += "&";
        queryString +="isbn=" + criteria.isbn;
      }
    }
    console.log(`${APIPATH}/Books${queryString}`)
     return this.http.get<BookShowDTO[]>(`${APIPATH}/Books${queryString}`)
  }

  addBook(book: BookUpdateDTO){
    return this.http.post<BookShowDTO>(`${APIPATH}/Books`,book)
  }

  getBook(id: number){
    return this.http.get<BookShowDTO>(`${APIPATH}/Books/${id}`)
  }

  updateBook(book: BookUpdateDTO , id?: number){
    console.log(`${APIPATH}/Books/${id}`)
    return this.http.put<BookShowDTO>(`${APIPATH}/Books/${id}`, book)
    
  }

  deleteBook(id: number){
    return this.http.delete(`${APIPATH}/Books/${id}`)
  }

  getMember(path: string|null){
    return this.http.get<MemberDTO>(`${APIPATH}/Members/${path}`)
  }

  getMembers(query?:string){
    return this.http.get<MemberDTO[]>(`${APIPATH}/Members${query}`)
  }

  addMember(member: MemberDTO){
    return this.http.post<MemberDTO>(`${APIPATH}/Members`, member)
  }

  updateMember(member: MemberDTO){
    console.log(member)
    return this.http.put<MemberDTO>(`${APIPATH}/Members/${member.id}`, member)
  }
  deleteMember(id: number){
    return this.http.delete(`${APIPATH}/Members/${id}`)
  }
  getSubscriptions(id?:string|null){
    return this.http.get<SubscriptionRawDTO[]>(`${APIPATH}/Subscriptions/Member/${id}`)
  }

  getCurrentSubscription(id?:string|null){
    return this.http.get<SubscriptionRawDTO>(`${APIPATH}/Subscriptions/Membercurrent/${id}`)
  }

  addSubscription(data: SubscriptionInsertDTO){
    return this.http.post<SubscriptionRawDTO>(`${APIPATH}/Subscriptions`, data)
  }
  stopSubscription(id:number|undefined){
    return this.http.put<SubscriptionRawDTO>(`${APIPATH}/Subscriptions/${id}`,undefined)
  }

  getBorrowedBooks(id?: string|null){
    return this.http.get<number>(`${APIPATH}/Borrowings/BorrowedBooks/${id}`)
  }
  

  getBookBorrowings(bookId: number){
    return this.http.get<BorrowingRawDTO[]>(`${APIPATH}/Borrowings/Book/${bookId}`)
  }

  getMemberBorrowings(memberId: number){
    return this.http.get<BorrowingRawDTO[]>(`${APIPATH}/Borrowings/Member/${memberId}`)
  }

  getExpiredBorrowings(){
    return this.http.get<BorrowingRawDTO[]>(`${APIPATH}/Borrowings/Expired`)
  }

  returnBook(borrowingId?: number){
    return this.http.put<BorrowingRawDTO>(`${APIPATH}/Borrowings/${borrowingId}`, undefined)
  }

  cancelBorrowing(borrowingId?: number){
    return this.http.delete(`${APIPATH}/Borrowings/${borrowingId}`)
  }

  checkCanBorrow(memberId: number){
    return this.http.get<boolean>(`${APIPATH}/Borrowings/CanBorrow/${memberId}`)
  }

  borrowBook(submitData : BorrowingInsertDTO){
    return this.http.post<BorrowingRawDTO>(`${APIPATH}/Borrowings`, submitData)
  }
  getSubscTypes(){
    return this.http.get<SubscriptionTypeShowDTO[]>(`${APIPATH}/SubscTypes`)
  }

  deleteSubscType(id?: number){
    return this.http.delete(`${APIPATH}/SubscTypes/${id}`)

  }

  updateSubscType(data: SubscriptionTypeShowDTO){
    return this.http.put<SubscriptionTypeShowDTO>(`${APIPATH}/SubscTypes/${data.id}`, data)
  }

  addSubscType(data: SubscriptionTypeShowDTO){
    return this.http.post<SubscriptionTypeShowDTO>(`${APIPATH}/SubscTypes`, data )
  }

  login(credentials: Credentials){
    return this.http.post<SecurityToken>(`${APIPATH}/Users/Login`, credentials)
  }

  getAllUsers(){
    return this.http.get<UserShowDTO[]>(`${APIPATH}/Users`)
  }

  getUser(username: string){
    return this.http.get<UserShowDTO>(`${APIPATH}/Users/${username}`)
  }

  registerUser(user: UserRegisterDTO){
    return this.http.post<UserShowDTO>(`${APIPATH}/Users`, user)
  }

  updateUser(user: UserUpdateDTO){
    return this.http.put<UserShowDTO>(`${APIPATH}/Users/${user.username}`, user)
  }

  deleteUser(id: number){
    return this.http.delete(`${APIPATH}/Users/${id}`)
  }


}