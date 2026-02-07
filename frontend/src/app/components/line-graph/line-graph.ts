import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'line-chart',
  standalone: true,
  templateUrl: './line-graph.html',
  styleUrls: ['./line-graph.css']
})
export class LineChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  
  @Input() historyData: any[] = []; 
  
  @ViewChild('lineChart') private chartRef!: ElementRef;
  private chart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historyData'] && this.chart) {
      this.updateChartData();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    const canvas = this.chartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
    gradientGreen.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
    gradientGreen.addColorStop(1, 'rgba(16, 185, 129, 0)');

    const gradientRed = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRed.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
    gradientRed.addColorStop(1, 'rgba(244, 63, 94, 0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Income',
            data: [],
            borderColor: '#10b981',
            backgroundColor: gradientGreen,
            fill: true,
            pointBackgroundColor: '#1e1e2d',
            pointBorderColor: '#10b981',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4
          },
          {
            label: 'Expenses',
            data: [],
            borderColor: '#f43f5e',
            backgroundColor: gradientRed,
            fill: true,
            pointBackgroundColor: '#1e1e2d',
            pointBorderColor: '#f43f5e',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            align: 'start',
            labels: {
              color: '#9ca3af',
              usePointStyle: true,
              boxWidth: 8,
              padding: 20,
              font: { family: 'sans-serif', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#111827',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 10,
            cornerRadius: 8,
            displayColors: true
          }
        },
        scales: {
          x: {
            ticks: { color: '#6b7280', font: { size: 11 } },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#6b7280', font: { size: 11 } },
            grid: {
              color: '#374151',
              lineWidth: 0.5,
              tickBorderDash: [5, 5]
            },
            beginAtZero: true,
            border: { display: false }
          }
        }
      }
    });

    if (this.historyData && this.historyData.length > 0) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (!this.chart || !this.historyData || !Array.isArray(this.historyData)) {
      return;
    }

    try {
      this.chart.data.labels = this.historyData.map(d => d.mes);
      this.chart.data.datasets[0].data = this.historyData.map(d => Number(d.total_entradas));
      this.chart.data.datasets[1].data = this.historyData.map(d => Number(d.total_saidas));
      this.chart.update();
    } catch (error) {
      console.error(error);
    }
  }
}