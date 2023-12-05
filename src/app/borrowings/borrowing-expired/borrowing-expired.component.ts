import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowingShowDTO } from '../../interfaces/borrowing-show-dto';
import { MemberDTO } from '../../interfaces/member-dto';
import { BookShowDTO } from '../../interfaces/book-show-dto';
import { AppService } from '../../app.service';
import { BorrowingListComponent } from '../borrowing-list/borrowing-list.component';

@Component({
  selector: 'app-borrowing-expired',
  standalone: true,
  imports: [CommonModule, BorrowingListComponent],
  templateUrl: './borrowing-expired.component.html',
  styleUrl: './borrowing-expired.component.css'
  
})
export class BorrowingExpiredComponent {
  counter: number = 0;

  selectedBorrowing?: BorrowingShowDTO
  
  constructor(private service: AppService = Inject(AppService)){  }

  show(data: BorrowingShowDTO){
    this.selectedBorrowing = data
  }

  hide(){
    this.selectedBorrowing = undefined
  }

  ngOnInit(){
    this.counter++
    if(this.counter <2) this.ngOnInit()
  }


}
