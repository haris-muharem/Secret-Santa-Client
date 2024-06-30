import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
newUser: any = {};
loggedIn = false;
  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  createUser()
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




   return this.http.post('http://3.71.92.233:8080/api/users/register', this.newUser, httpOptions).subscribe(
    {
      next: response => 
      {
        console.log(response)
      },
      error: error => console.log(error)
    }
   )
  }


  getCurrentUser()
  {
    this.accountService.currentUser$.subscribe({
      next: user => this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }


}
