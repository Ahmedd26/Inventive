import { timeRange } from './../../../../core/utils/constants.utils';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { chartsService } from '../../charts.service';

@Component({
  selector: 'app-top-selling-products',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './top-selling-products.component.html',
})
export class TopSellingProductsComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  timeRange = timeRange;
  constructor(private chartsService: chartsService) {}

  ngOnInit(): void {
    this.fetchData(7);
  }

  onTimeRangeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value !== 'null') {
      this.fetchData(+value);
    }
  }

  fetchData(timeRange: number): void {
    this.chartsService
      .topSellingProducts(10, timeRange)
      .subscribe((res: any) => {
        this.generateChart(res);
      });
  }

  generateChart(res: any) {
    // Chart Settings
    const primaryElement = document.getElementById(
      'primaryText',
    ) as HTMLElement;
    const secondaryElement = document.getElementById(
      'secondaryText',
    ) as HTMLElement;
    const gridColorElement = document.getElementById(
      'gridColor',
    ) as HTMLElement;
    const textColor = getComputedStyle(primaryElement).color;
    const textColorSecondary = getComputedStyle(secondaryElement).color;
    const gridColor = getComputedStyle(gridColorElement).color;
    const documentStyle = getComputedStyle(document.documentElement);
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      // labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      labels: res[0],
      datasets: [
        {
          label: 'Most selling Products',
          // data: [540, 325, 702, 620],
          data: res[1],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };

    this.basicOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColorSecondary,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: gridColor,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: gridColor,
            drawBorder: false,
          },
        },
      },
    };
  }
}
