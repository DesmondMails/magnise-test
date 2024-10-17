import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistoricalData } from '@features/home/interfaces';
import { HomeService } from '@features/home/state';

import { colors, lineChartOptionsConfig } from './configs';

@UntilDestroy()
@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.scss'],
})
export class MarketChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private colors: string[] = colors;

  lineChartType: ChartType = 'line';

  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };
  lineChartOptions: ChartConfiguration['options'] = lineChartOptionsConfig;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.subscribeToHistoricalData();
  }

  private subscribeToHistoricalData(): void {
    this.homeService
      .getHistoricalDataReceived()
      .pipe(untilDestroyed(this))
      .subscribe((historicalData) => {
        this.updateChartData(historicalData);
      });
  }

  private updateChartData(historicalData: HistoricalData): void {
    const { data } = historicalData;
    const labels = data.map((data) => new Date(data.t).toLocaleDateString());

    const dataSetObj = this.createDatasetObject(historicalData);

    this.lineChartData = {
      labels,
      datasets: [...this.lineChartData.datasets, dataSetObj],
    };

    this.chart?.update();
  }

  private createDatasetObject(historicalData: HistoricalData): any {
    const { currency, data } = historicalData;

    const label = `Closing Price (${currency})`;

    const chartData = data.map((data) => data.c);

    const colorIndex = this.lineChartData.datasets.length % this.colors.length; // Cycle through colors
    const color = this.colors[colorIndex];

    const dataSetObj = {
      label,
      data: chartData,
      borderColor: color,
      backgroundColor: color.replace(/rgba\((\d+), (\d+), (\d+), (\d+)\)/, 'rgba($1, $2, $3, 0.2)'),
      borderWidth: 2,
      fill: true,
    };

    return dataSetObj;
  }
}
