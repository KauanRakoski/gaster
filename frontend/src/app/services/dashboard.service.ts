import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient)
  private api_url = environment.apiUrl
  private router = inject(Router)

  buildHeaders(){
    let token = localStorage.getItem('user_token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  
    });
  }

  getTransactions(): Observable<any[]>{
    let headers = this.buildHeaders()

    return this.http.get<any>(`${this.api_url}/transaction`, { headers }).pipe(
      map(res => {
        if (res.success)
          return res.transactions
        else
          return []
      })
    )
  }

  getExpendedOnCategories(){
    let headers = this.buildHeaders()

    return this.http.get<any>(`${this.api_url}/category/30`, { headers }).pipe(
      map(res => {
        if (res.success)
          return res.categories
        else
          return []
      })
    )
  }

  getAllCategories(){
    let headers = this.buildHeaders()

    return this.http.get<any>(`${this.api_url}/rawcategory`, { headers }).pipe(
      map(res => {
        if (res.success)
          return res.categories
        else
          return []
      })
    )
  }

  createTransaction(transaction: any){
    let headers = this.buildHeaders()

    return this.http.post<any>(`${this.api_url}/transaction`, transaction, { headers })
  }

  editTransaction(transaction: any, editingId: number){
    let headers = this.buildHeaders()

    return this.http.put<any>(`${this.api_url}/transaction/${editingId}`, transaction, { headers })
  }

  getMonthlyBalance(){
    let headers = this.buildHeaders()

    return this.http.get<any>(`${this.api_url}/balance`, { headers }).pipe(
      map(res => {
        if (res.success)
          return res.data
        else
          return []
      })
    )
  }

  deleteTransaction(id: number): Observable<any>{
    let headers = this.buildHeaders()

    return this.http.delete(`${this.api_url}/transaction/${id}`, { headers });
  }

  deleteCategory(id: number): Observable<any>{
    let headers = this.buildHeaders()

    return this.http.delete(`${this.api_url}/category/${id}`, { headers });
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}
