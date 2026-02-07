import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Chart } from 'chart.js/auto';

interface CategoryChart {
  category_id: number;
  category_name: string;
  color: string;
  total_amount: string;
}

@Component({
  selector: 'donut-chart',
  standalone: true,
  templateUrl: './doughnut.html',
  styleUrls: ['./doughnut.css']
})
export class DonutChartComponent implements OnChanges, OnDestroy {

  @Input() categories: CategoryChart[] = [];

  private chartRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  @ViewChild('donutCanvas') set content(content: ElementRef<HTMLCanvasElement>) {
    if (content) {
      this.chartRef = content;
      this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']) {
      if (this.chart) {
        this.updateChart();
      } else if (this.chartRef) {
        this.createChart();
      }
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private createChart(): void {
    if (!this.chartRef || !this.chartRef.nativeElement) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            }
          }
        }
      }
    });

    this.updateChart();
  }

  private updateChart(): void {
    if (!this.chart) return;

    this.chart.data.labels = this.categories.map(c => c.category_name);
    this.chart.data.datasets[0].data = this.categories.map(c => Number(c.total_amount));
    this.chart.data.datasets[0].backgroundColor = this.categories.map(c => c.color);

    this.chart.update();
  }
}