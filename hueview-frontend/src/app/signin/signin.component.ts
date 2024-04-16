import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.handleSignIn();
    setTimeout(() => {
      this.reload();
    }, 1000);
  }

  handleSignIn() {
    const loginRequest = { username: this.username, password: this.password };
    this.authService.login(loginRequest).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
  
        this.authService.setUserDetails(response.user);
  
        this.username = '';
        this.password = '';
        this.rememberMe = false;
  
        this.router.navigate(['/']);
        console.log(response.user.name + " logged in");
      },
      (error: any) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed:', error);
      }
    );
  }

  reload() {
    window.location.reload();
  }
}