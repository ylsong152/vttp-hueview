import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  navItems: string[] = ["Sign In"];
  user: any;

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.navItems = [`Welcome, ${this.user.username}`];
    }
  }

  toHome() {
    this.router.navigate([""]);
  }

  navigateToSignin() {
    if (this.user) {
      this.router.navigate(["profile"]);
    } else {
      this.router.navigate(["signin"]);
    }
  }
}