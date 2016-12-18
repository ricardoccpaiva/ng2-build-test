import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRequestDetailComponent } from './expense-request-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'expense-requests/:id', component: ExpenseRequestDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [ExpenseRequestDetailComponent],
  exports: [ExpenseRequestDetailComponent]
})
export class ExpenseRequestDetailModule { }
