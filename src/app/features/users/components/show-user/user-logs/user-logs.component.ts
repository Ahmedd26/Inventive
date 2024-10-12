import { Component, Input, OnInit } from '@angular/core';
import { ILog } from '../../../../profile/components/latest-transactions/latest-transactions.component';
import { ActivityLogsService } from '../../../../../core/services/activity-logs-service/activity-logs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-logs',
  standalone: true,
  imports: [PaginationComponent, CommonModule],
  templateUrl: './user-logs.component.html',
})
export class UserLogsComponent implements OnInit {
  @Input({ required: true }) userId!: number;
  logs!: ILog[];
  constructor(private activityLogsService: ActivityLogsService) {}
  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedLogs: ILog[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;
  updatePaginatedLogs(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLogs = this.logs.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedLogs(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//
  ngOnInit(): void {
    if (this.userId) {
      this.activityLogsService.get(this.userId).subscribe({
        next: (data: any) => {
          console.log(JSON.stringify(data[0]));

          this.logs = data.reverse() as ILog[];
          // ** ---------- PAGINATION ---------- **//
          this.totalItems = this.logs.length;
          this.updatePaginatedLogs(1);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message, error.status);
        },
      });
    }
  }
}
