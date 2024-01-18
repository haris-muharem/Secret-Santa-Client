import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [

  {path: 'recepient', component: UserDashboardComponent},
  {path: 'pairs', component: AdminDashboardComponent},
  {path: 'create', component: AddUserComponent},
  {path: '**', component: UserDashboardComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
