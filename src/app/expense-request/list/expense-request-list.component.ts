import { Component, OnInit } from '@angular/core';
import { TableData } from './table-data';
import { ExpenseRequestService } from '../services/expense-request.service';
import { ExpenseRequest } from '../models/expense-request';
import { NgProgressService } from "ng2-progressbar";
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

@Component({
  moduleId: "ca",
  selector: 'app-expense-request-list',
  templateUrl: './expense-request-list.component.html',
  styleUrls: ['./expense-request-list.component.css'],
  providers: [ExpenseRequestService, Modal]
})
export class ExpenseRequestListComponent implements OnInit {
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Id', name: 'id' },
    { title: 'Name', name: 'name' },
    { title: 'Date', name: 'date' }
  ];
  public page: number = 1;
  public per_page: number = 10;
  public maxSize: number = 5;
  public total_pages: number = 1;
  public item_count: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped table-condensed']
  };

  public data: Array<any>;

  public constructor(
    private expenseRequestService: ExpenseRequestService,
    private pService: NgProgressService,
    public modal: Modal) {
  }

  public ngOnInit(): void {
    this.onChangeTable(this.config);
  }

  onClick() {
    this.modal.confirm()
      .keyboard(27)
      .showClose(true)
      .okBtnClass('btn btn-success')
      .cancelBtnClass('btn btn-danger')
      .title('Are you sure ?')
      .body(`Are you sure do you want to delete the expense request ?`)
      .open();
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    debugger;
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.per_page }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    this.pService.start();
    this.expenseRequestService.getList(page.page, this.per_page)
      .subscribe(p => {
        this.data = p.expense_requests;
        this.item_count = p.item_count;
        this.page = p.page;
        this.per_page = p.per_page;
        this.total_pages = p.total_pages;
        //let filteredData = this.changeFilter(this.data, this.config);
        //let sortedData = this.changeSort(filteredData, this.config);
        this.rows = this.data;
        this.pService.done();
      });
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
}
