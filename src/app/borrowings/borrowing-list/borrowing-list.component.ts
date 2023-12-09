import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowingShowDTO } from '../../interfaces/borrowing-show-dto';
import { BorrowingRawDTO } from '../../interfaces/borrowing-raw-dto';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-borrowing-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrowing-list.component.html',
  styleUrl: './borrowing-list.component.css'
})
export class BorrowingListComponent {
  @Input() bookId?: number
  @Input() bookName?: string
  @Input() memberId?: number
  @Input() memberName?: string
  @Input() searchMode?:string
  @Output() returnSelected = new EventEmitter()
  @Output() showSelection = new EventEmitter<BorrowingShowDTO>()
  error : any
  
  borrowingList?: BorrowingShowDTO[]

  constructor(private service:AppService =  Inject(AppService)){}

  ngOnInit(){
    this.loadData()
  }
  
  ngOnChanges(changes :SimpleChanges){
    if(changes['memberId'].currentValue)  {
      this.loadData()
    }
    if(changes['searchMode'].currentValue){
      this.loadData
    }
    if(changes['bookId'].currentValue){
      this.loadData
    }
  }

  loadData(){
    switch(this.searchMode){
      case "book":
        if(this.bookId){
          console.log("The component has read the item" + this.bookId)
          this.service.getBookBorrowings(this.bookId).subscribe({
            next: (data)=>{
              this.mapList(data)
              console.log("data from api recalled")
            },
            error: (err)=>{
              this.error = err
              console.log(err)
            }
          })
        }
        break;
        case "member":
          if(this.memberId){
            this.service.getMemberBorrowings(this.memberId).subscribe({
              next: (data)=>{
                this.mapList(data)
              },
              error: (err)=>{
                this.error = err
              }
              
            })
          }
          break;
          case "expired":
            this.service.getExpiredBorrowings().subscribe({
              next: (data)=>{
                this.mapList(data)
              },
              error: (err)=>{
                this.error = err
                console.log(err)
              }
            })
            break
            default:
    }
  }


  mapList(data: BorrowingRawDTO[]){
    this.borrowingList = []
    for(let item of data){
      let current = new BorrowingShowDTO(item)
      this.borrowingList.push(current)
    }
    this.borrowingList.sort((a, b)=> a.startDate.valueOf()- b.startDate.valueOf())
  }

  returnBook(id: number|undefined){
    this.service.returnBook(id).subscribe({
      next: (data)=>{
        this.loadData()
      },
      error: (err)=>{
        this.error = err
      }
    })
  }

  cancelBorrowing(id: number|undefined){
    if(confirm("Are you sure you want to delete this record from the borrowing history?")){
      this.service.cancelBorrowing(id).subscribe({
        next: (data)=>{
          this.loadData()
        },
        error: (err)=>{
          this.error = err
        }
      })
    }
  }

  returnClicked(){
    this.returnSelected.emit()
  }

  showBorrowing(id?: number){
    let selected = this.borrowingList?.find(a => a.id== id)
    this.showSelection.emit(selected)
  }

  

}
