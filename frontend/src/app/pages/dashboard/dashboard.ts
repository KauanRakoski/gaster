import { Component, inject, OnInit } from '@angular/core';
import { LineChartComponent } from '../../components/line-graph/line-graph';
import { DonutChartComponent } from "../../components/doughnut/doughnut";
import { SpendTableComponent } from '../../components/spend-table/spend-table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ChangeDetectorRef } from '@angular/core';
import { SummaryCardComponent } from '../../components/summary-card/summary-card';
import { environment } from '../../../environments/environment';

interface TransactionData {
  description: string;
  amount: number;
  date: string | null; 
  type: 'income' | 'expense'; 
  category_id: number | null;
}

@Component({
  selector: 'app-dashboard',
  imports: [DonutChartComponent, LineChartComponent, SpendTableComponent, CommonModule, SummaryCardComponent, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  private http = inject(HttpClient)
  private api_url = environment.apiUrl
  private dashboardService = inject(DashboardService)
  private cdr = inject(ChangeDetectorRef);

  public add_visible = false
  public add_category_visible = false

  public loading = true

  public transactionsData: any[] = []
  public categoriesData: any[] = []
  public categoriesBasic: any[] = []
  public financialHistory: any[] = []

  editingId: number | null = null;

  public transaction_data: TransactionData = {
    description: '',
    amount: 0,
    date: null,
    type: 'expense',
    category_id: 1
  }

  category_data = {
    name: '',
    color: '#3b82f6' // Uma cor padrão inicial (azul bonito, por exemplo)
  };

  ngOnInit(): void {
      this.fetchData()
  }

  fetchData(){
    forkJoin({
        transactions: this.dashboardService.getTransactions(),
        categories: this.dashboardService.getExpendedOnCategories(),
        allCategories: this.dashboardService.getAllCategories(),
        history: this.dashboardService.getMonthlyBalance()
      }).subscribe({
        next: ({ transactions, categories, allCategories, history }) => {
          this.transactionsData = [...transactions];
          this.categoriesData = [...categories];
          this.categoriesBasic = [...allCategories]
          this.financialHistory = [...history]
          
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.error('Erro ao carregar dashboard', err);
        }
      })
  }

  showPopup(){
    this.add_visible = true;
  }

  showPopupCategory(){
    this.add_category_visible = true;
  }

  closePopupCategory(){
    this.add_category_visible = false;
    this.cleanForm()
  }

  closePopup(){
    this.add_visible = false;
    this.cleanForm()
    this.fetchData()
  }

  saveCategory(){
    if (this.category_data.name == '') return
    let token = localStorage.getItem('user_token')
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  
    });

    this.http.post<any>(`${this.api_url}/category`, this.category_data, { headers }).subscribe({
      next: (res) => {
        console.log('Sucesso:', res);
        this.closePopup();
      },
      
      error: (erro) => {
        console.error('Erro ao salvar:', erro);
        alert('Erro ao salvar a transação!');
      }
    })
  }

  private cleanForm(){
    this.transaction_data.description = ''
    this.transaction_data.amount = 0
    this.transaction_data.date = null
    this.transaction_data.category_id = 1
    this.transaction_data.type = 'expense'
  }

  saveTransaction(){
    if (this.transaction_data.description == '') return
    
    if (!this.editingId){
      this.dashboardService.createTransaction(this.transaction_data).subscribe({
        next: (res) => { this.closePopup() },
        error: (erro) => { alert('Erro ao salvar a transação!') }
      })
    } else {
      this.dashboardService.editTransaction(this.transaction_data, this.editingId).subscribe({
        next: (res) => { this.closePopup() },
        error: (erro) => { alert('Erro ao salvar a transação!') }
      })
    }
  }

  DeleteTransaction(id: number){
    this.dashboardService.deleteTransaction(id).subscribe(() => {
      this.fetchData()
    })
  }

  editTransaction(item: any){
    this.editingId = item.id

    this.transaction_data = {
    description: item.description,
    amount: item.amount,
    date: new Date(item.date).toISOString().split('T')[0], 
    category_id: item.category_id,
    type: item.type === 1 ? 'income' : 'expense'
    };

    this.add_visible = true;
  }

  deleteCategory(id: number){
    this.dashboardService.deleteCategory(id).subscribe(() => {
      this.fetchData()
    })
  }

  signOut(){
    this.dashboardService.logout()
  }
}
