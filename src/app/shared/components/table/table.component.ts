import {
  Component,
  Input,
  SimpleChanges,
  OnInit,
  AfterViewInit,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { DeletePopUpComponent } from './components/delete-pop-up/delete-pop-up.component';
import { MenuComponent } from "./components/menu/menu.component";

interface ITable {
  id: number | string;
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconsModule, CommonModule, DeletePopUpComponent, MenuComponent],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input({ required: true }) tableData: ITable[] = [];
  @Input({ required: true }) tableHeaders: string[] = [];
  @Input() limit: number = 5;
  @Output() deleteById = new EventEmitter();
  @Output() updateById = new EventEmitter();
  currentPage = 1;
  total: number = 0;
  start = 0;
  end = 0;
  pages: number[] = [];
  pagesCount = 1;
  // Pagination
  changePage(page: number): void {
    this.currentPage = page;
    this.updatePages();
    this.updateDisplayRange();
  }

  displayList(): ITable[] {
    return this.tableData.slice(this.start, this.end);
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }

  decrementPage(): void {
    if (this.currentPage > 1) this.changePage(this.currentPage - 1);
  }

  incrementPage(): void {
    if (this.currentPage < this.pagesCount)
      this.changePage(this.currentPage + 1);
  }

  updatePages(): void {
    const maxPagesToShow = 5;
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
    let startPage, endPage;

    if (this.pagesCount <= maxPagesToShow) {
      startPage = 1;
      endPage = this.pagesCount;
    } else if (this.currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (this.currentPage + maxPagesAfterCurrentPage >= this.pagesCount) {
      startPage = this.pagesCount - maxPagesToShow + 1;
      endPage = this.pagesCount;
    } else {
      startPage = this.currentPage - maxPagesBeforeCurrentPage;
      endPage = this.currentPage + maxPagesAfterCurrentPage;
    }

    this.pages = this.range(startPage, endPage);
  }

  updateDisplayRange(): void {
    this.start = this.limit * (this.currentPage - 1);
    this.end = this.start + this.limit;
  }

  trackById(index: number, item: ITable): number | string {
    return item.id;
  }

  //** CONTEXT MENU METHODS **//
  // Delete
  deleteItem(id: number) {
    this.deleteById.emit(id);
    this.tableData = this.tableData.filter((item) => item.id !== id);
    this.total = this.tableData.length;
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.updatePages();
    this.updateDisplayRange();
  }
  // View
  viewItem(id: number) {}
  updateItem(id: number) {
    this.updateById.emit(id);
  }

  //** Component life cycle methods **//
  ngAfterViewInit(): void {
    // this.total = this.tableData.length;
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.updatePages();
    this.updateDisplayRange();
    initFlowbite();
  }
  ngOnInit(): void {
    // this.total = this.tableData.length;
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.updatePages();
    this.updateDisplayRange();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && this.tableData) {
      this.total = this.tableData.length;
      this.pagesCount = Math.ceil(this.total / this.limit);
      this.updatePages();
      this.updateDisplayRange();
    }
  }
}
