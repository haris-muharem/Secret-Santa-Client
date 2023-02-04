import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

loggedUser: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserPair();
  }

getUserPair()
{
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }
    const user: User = JSON.parse(userString);
    const userId = user.id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token })
    };


    return this.http.get('https://localhost:44361/api/users/' + userId, httpOptions ).subscribe({
        next: response => this.loggedUser = response,
        error: error => console.log(error),
        complete: () => console.log('Request has completed')
      })
}

}
