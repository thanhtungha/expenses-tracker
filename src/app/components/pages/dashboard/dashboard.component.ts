import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  entriesTitle = 'No. of Entries';
  entriesVal = '100';
  spendingTitle = 'Total Spending';
  spendingVal = '$230000';
  approvalTitle = 'Needs approval';
  approvalVal = '100';
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const container = document.querySelector('.container') as HTMLElement;
    const boxes = document.querySelectorAll('.box') as NodeListOf<HTMLElement>;

    if (window.innerWidth < 768) {
      container.style.flexDirection = 'column';
      boxes.forEach((box) => {
        box.style.width = '100%';
        box.style.marginBottom = '1rem';
      });
    } else {
      container.style.flexDirection = 'row';
      boxes.forEach((box) => {
        box.style.width = '33.33%';
        box.style.marginBottom = '0';
      });
    }
  }
}
