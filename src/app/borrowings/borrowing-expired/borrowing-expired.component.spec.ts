import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingExpiredComponent } from './borrowing-expired.component';

describe('BorrowingExpiredComponent', () => {
  let component: BorrowingExpiredComponent;
  let fixture: ComponentFixture<BorrowingExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowingExpiredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowingExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
