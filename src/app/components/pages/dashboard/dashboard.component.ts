import { Component, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { ExpensesService } from '../../../services/expenses/expenses.service';
import { Subject, takeUntil } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  $unSubscribe = new Subject();

  entriesTitle = 'No. of Entries';
  entriesVal = '0';
  spendingTitle = 'Total Spending';
  spendingVal = '0';
  categoriesChart: ChartOptions;
  statusesChart: ChartOptions;

  constructor(private readonly expensesService: ExpensesService) {
    this.categoriesChart = {
      series: [],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
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

    this.statusesChart = {
      series: [],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
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
    this.expensesService
      .getSummary()
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe({
        next: (res: any) => {
          const categoryNames = Object.keys(res.categories);
          this.categoriesChart.labels = categoryNames;
          const categoryValues = Object.values(res.categories);
          const categoriesSeries: ApexNonAxisChartSeries = categoryValues.map(
            (value) => Number(value)
          );
          this.categoriesChart.series = categoriesSeries;

          const statuses = Object.keys(res.statuses);
          this.statusesChart.labels = statuses;
          const statusesValues = Object.values(res.statuses);
          const statusesSeries: ApexNonAxisChartSeries = statusesValues.map(
            (value) => Number(value)
          );
          this.statusesChart.series = statusesSeries;

          this.entriesVal = res.totalExpenses;
          this.spendingVal = '£ ' + res.totalAmount;
        },
        error: (e: any) => {
          console.error(e);
        },
      });
  }
}
