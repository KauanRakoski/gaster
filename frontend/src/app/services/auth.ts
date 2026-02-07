import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map , tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)
  private api_url = 'http://127.0.0.1:3000'

  signUp(userData: { email: string, password: string }) {
    let body = {
      email: userData.email,
      password: userData.password,
      phone_number: 555
    }
    return this.http.post<any>(`${this.api_url}/user`, body).pipe(
      tap(res => {
        if (res.status == 200) {
          console.log("OKKKK")
        }
      })
    )
  }

  signIn(userData: { email: string, password: string }) {
    let body = {
      email: userData.email,
      password: userData.password,
      phone_number: 555
    }
    return this.http.post<any>(`${this.api_url}/login`, body).pipe(
      tap(res => {
        localStorage.setItem('user_token', res.description)
      })
    )
  }

  isLoggedIn() {
    let token = localStorage.getItem('user_token')

    if (!token || token == '')
      return false;

    let headers = { Authorization: token }

    return this.http.get<any>(`${this.api_url}/validate`, { headers }).pipe(
      map(res => {
        if (res.status == 200) return true;
        return false;
      })
    )
  }

  requestPasswordReset (email: string) {
    return this.http.post<any>(`${this.api_url}/recover`, { email })
  }

  resetPassword(token: string, password: string) {
  return this.http.put<any>(`${this.api_url}/user`, { token, password });
}
}
