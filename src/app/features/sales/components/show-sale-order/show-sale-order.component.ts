import { SalesService } from './../../sales.service';
import { Component, OnInit } from '@angular/core';
import { ISalesOrder } from '../../sales.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../shared/icons/icons.module';

@Component({
  selector: 'app-show-sale-order',
  standalone: true,
  imports: [LoadingComponent, CommonModule, RouterLink, IconsModule],
  templateUrl: './show-sale-order.component.html',
})
export class ShowSaleOrderComponent implements OnInit {
  isLoading = false;
  sale!: ISalesOrder;
  constructor(
    private salesService:SalesService,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit() {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.salesService.get(+routeId).subscribe({
      next: (sale: ISalesOrder) => {
        this.sale = sale;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }}
