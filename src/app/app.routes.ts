import {RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookContainerComponent } from './books/book-container/book-container.component';
import { NgModule } from '@angular/core';
import { BookSearchComponent } from './books/book-search/book-search.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MemberContainerComponent } from './members/member-container/member-container.component';
import { SubscriptionContainerComponent } from './subscriptions/subscription-container/subscription-container.component';
import { BorrowingFormComponent } from './borrowings/borrowing-form/borrowing-form.component';
import { BorrowingExpiredComponent } from './borrowings/borrowing-expired/borrowing-expired.component';
import { ParametersComponent } from './admin/parameters/parameters.component';
import { LoginComponent } from './Users/login/login.component';


export const routes: Routes = [

    {path:"", component:HomeComponent},
    {path:'books', component:BookContainerComponent},
    {path: 'members', component:MemberContainerComponent},
    {path:'subscriptions/:id', component:SubscriptionContainerComponent},
    {path: 'borrowings', component: BorrowingFormComponent},
    {path: 'expired', component: BorrowingExpiredComponent},
    {path: 'parameters', component: ParametersComponent},
    {path: 'login', component: LoginComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(routes)]
})
export class AppRoutingModule{}
