import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
users: any;
loggedIn = false;
constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getPairs();
    this.getCurrentUser();
  }

  getPairs()
  {

   /* const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }
    const user: User = JSON.parse(userString);
    const userId = user.id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token })
    };
*/



    // Here we make the requests to our API Server
    this.http.get('http://localhost:8080/api/users', this.accountService.getTokenForHttpHeader()).subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }


  getCurrentUser()
  {
    this.accountService.currentUser$.subscribe({
      next: user => this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }

  generatePairs()
  {
    /*const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }
    const user: User = JSON.parse(userString);
    const userId = user.id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token })
    };
*/


    this.http.get('http://localhost:8080/api/users/GeneratePairs', this.accountService.getTokenForHttpHeader()).subscribe();
    window.location.reload()
  }


}
