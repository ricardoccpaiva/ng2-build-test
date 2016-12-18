import { Expense } from '../models/expense';

export class ExpenseRequest{
  id: string;
  name: string;
  date: string;
  created_at: string;
  updated_at: string;
  description: string;
  expenses: Expense[];
}
