import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dainty-scarf-production.up.railway.app/api/auth';

  constructor(private http: HttpClient) {}

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginRequest);
  }

  setUserDetails(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserDetails(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeUserDetails(): void {
    localStorage.removeItem('user');
  }
}