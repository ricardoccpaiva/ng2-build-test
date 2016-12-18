import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { ExpenseRequestList } from '../models/expense-request-list';
import { ExpenseRequest } from '../models/expense-request';
import { Observable }     from 'rxjs/Observable';
import { deserialize } from "class-transformer";
import {Type, plainToClass} from "class-transformer";

@Injectable()
export class ExpenseRequestService {
    private apiUrl = 'https://fueldesk-api.herokuapp.com/api/expense_request';  // URL to web API

    constructor(private http: Http) { }

    getList(page: number, per_page: number): Observable<ExpenseRequestList> {
        return this.http.get(this.apiUrl + "?page=" + page + "&per_page=" + per_page)
            .map(this.extractList);
    }

    getDetail(id: string): Observable<ExpenseRequest> {
        return this.http.get(this.apiUrl + "/" + id)
            .map(this.extractDetail);
    }

    private extractList(res: Response) {
        return res.json() as ExpenseRequestList;
    }

    private extractDetail(res: Response) {
        return res.json() as ExpenseRequest;
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
