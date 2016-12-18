import { ExpenseRequest } from '../models/expense-request';
import { ApiResponse } from '../../shared/models/api-response'
import { Type } from "class-transformer";

export class ExpenseRequestList extends ApiResponse {
   @Type(() => ExpenseRequest)
  expense_requests: ExpenseRequest[];
}
