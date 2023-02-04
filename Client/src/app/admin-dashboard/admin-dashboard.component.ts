import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
users: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPairs();
  }

  getPairs()
  {
    // Here we make the requests to our API Server
    this.http.get('https://localhost:44361/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }


}
