import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionContainerComponent } from './subscription-container.component';

describe('SubscriptionContainerComponent', () => {
  let component: SubscriptionContainerComponent;
  let fixture: ComponentFixture<SubscriptionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
