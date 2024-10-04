import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.calculatePages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['totalItems'] &&
      changes['totalItems'].currentValue !== undefined
    ) {
      this.calculatePages();
    }
    if (
      changes['itemsPerPage'] &&
      changes['itemsPerPage'].currentValue !== undefined
    ) {
      this.calculatePages();
    }
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePages();
  }

  updatePages() {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    this.pages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePages();
    this.pageChange.emit(this.currentPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
