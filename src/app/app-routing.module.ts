import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { DashboardEmployeeComponent } from './components/dashboard-employee/dashboard-employee.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"subscription",component:SignupComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"dashboardAdmin",component:DashboardAdminComponent},
  {path:"addTask",component:AddTaskComponent},
  {path:"editTask/:id",component:EditTaskComponent},
  {path:"taskInfo/:id",component:TaskInfoComponent},
  {path:"dashboardEmployee",component:DashboardEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
