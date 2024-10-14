import { ChartModule } from 'primeng/chart';
import { chartsService } from './../../charts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-per-products-pie',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './category-per-products-pie.component.html',
})
export class CategoryPerProductsPieComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  constructor(private chartsService: chartsService) {}

  ngOnInit(): void {
    this.fetchData(10);
  }

  fetchData(quantity: number): void {
    this.chartsService.categoriesPie(quantity).subscribe((res: any) => {
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
      labels: res[0],
      datasets: [
        {
          label: 'Categories with most products',
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
      // indexAxis: 'y',
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
