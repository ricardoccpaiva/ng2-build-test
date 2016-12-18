import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ExpenseRequestListComponent } from './expense-request-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    Ng2TableModule,
    PaginationModule,
    RouterModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [ExpenseRequestListComponent],
  exports: [ExpenseRequestListComponent]
})
export class ExpenseRequestListModule { }
