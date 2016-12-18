import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRequestListModule } from './list/expense-request-list.module';
import { ExpenseRequestDetailModule } from './detail/expense-request-detail.module';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AuthGuard } from '../auth-guard.service';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    TabsModule,
    CommonModule,
    ExpenseRequestListModule,
    ExpenseRequestDetailModule,
    RouterModule
  ],
  declarations: [],
  exports: [ExpenseRequestListModule, ExpenseRequestDetailModule]
})
export class ExpenseRequestModule { }
