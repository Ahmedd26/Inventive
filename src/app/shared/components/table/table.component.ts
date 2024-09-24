import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';

interface ITable {
  id: number | string;
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconsModule, CommonModule],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input({ required: true }) tableData: ITable[] = [];
  @Input({ required: true }) tableHeaders: string[] = [];
  @Input() limit: number = 10;
  currentPage = 1;
  total: number = 0;
  start = 0;
  end = 0;
  pages: number[] = [];
  pagesCount = 1;

  ngOnInit(): void {
    this.updatePages();
  }

  // Pagination
  changePage(page: number): void {
    this.currentPage = page;
    this.updatePages();
    this.start = this.limit * (this.currentPage - 1);
    this.end = this.start + this.limit;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && this.tableData) {
      this.total = this.tableData.length;
      this.pagesCount = Math.ceil(this.total / this.limit);
      this.updatePages();
    }
  }

  // Function to return only a portion of the data to display for the currently selected page.
  displayList(page: number): ITable[] {
    const start = this.limit * (page - 1);
    const end = start + this.limit;
    return this.tableData.slice(start, end);
  }
  // Set a range of pages (i.e., 1-20 pages)
  range(start: number, end: number): number[] {
    return [...Array(end - start + 1).keys()].map((el) => el + start);
  }
  // Pagination:  Previous Button
  decrementPage(): void {
    if (this.currentPage > 1) this.changePage(--this.currentPage);
  }
  // Pagination: Next Button
  incrementPage(): void {
    if (this.currentPage < this.pagesCount) this.changePage(++this.currentPage);
  }

  /**
   * Update the pages array based on the current page and total number of pages
   *
   * This function is used to determine which pages to display in the pagination
   * component. It takes into account the current page and the total number of pages,
   * and calculates the range of pages to display.
   */
  updatePages(): void {
    const maxPagesToShow = 5;
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
    let startPage, endPage;
    // If there are fewer pages than the maximum number to show, show all pages
    if (this.pagesCount <= maxPagesToShow) {
      startPage = 1;
      endPage = this.pagesCount;
    }
    // If the current page is one of the first pages, show the first X pages
    else if (this.currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPagesToShow;
    }
    // If the current page is one of the last pages, show the last X pages
    else if (this.currentPage + maxPagesAfterCurrentPage >= this.pagesCount) {
      startPage = this.pagesCount - maxPagesToShow + 1;
      endPage = this.pagesCount;
    }
    // Otherwise, show the current page and the X pages around it
    else {
      startPage = this.currentPage - maxPagesBeforeCurrentPage;
      endPage = this.currentPage + maxPagesAfterCurrentPage;
    }
    // Set the pages array to the range of pages to display
    this.pages = this.range(startPage, endPage);
  }
}
