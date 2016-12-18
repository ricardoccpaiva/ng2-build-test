import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExpenseRequestService } from '../services/expense-request.service';
import { ExpenseRequest } from '../models/expense-request'
import { NgProgressService } from "ng2-progressbar";

@Component({
  selector: 'app-expense-request-detail',
  templateUrl: './expense-request-detail.component.html',
  styleUrls: ['./expense-request-detail.component.css'],
  providers: [ExpenseRequestService]
})
export class ExpenseRequestDetailComponent implements OnInit {

  public expenseRequest: ExpenseRequest;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseRequestService: ExpenseRequestService,
    private pService: NgProgressService) {
    this.expenseRequest = new ExpenseRequest();
  }

  ngOnInit() {
    this.pService.start();
    this.route.params.subscribe(params => {
      this.expenseRequestService.getDetail(params['id']).subscribe(p => {
        this.expenseRequest = p;
        this.pService.done();
      });
    });
  }
}
