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
import { Authguard } from './authguard';
import { UserManagementComponent } from './Users/user-management/user-management.component';
import { UserUpdateComponent } from './Users/user-update/user-update.component';


export const routes: Routes = [

    {path:"", component:HomeComponent, canActivate:[Authguard]},
    {path:"home", component:HomeComponent, canActivate:[Authguard]},
    {path:'books', component:BookContainerComponent, canActivate: [Authguard]},
    {path: 'members', component:MemberContainerComponent, canActivate: [Authguard]},
    {path:'subscriptions/:id', component:SubscriptionContainerComponent, canActivate: [Authguard]},
    {path: 'borrowings', component: BorrowingFormComponent, canActivate: [Authguard]},
    {path: 'expired', component: BorrowingExpiredComponent, canActivate:[Authguard]},
    {path: 'parameters', component: ParametersComponent, canActivate: [Authguard]},
    {path: 'users', component: UserManagementComponent, canActivate: [Authguard]},
    {path: 'userupdate', component: UserUpdateComponent, canActivate:[Authguard]},
    {path: 'login', component: LoginComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(routes)]
})
export class AppRoutingModule{}
