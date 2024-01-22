import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScoreComponent } from './components/score/score.component';
import { NewsComponent } from './components/news/news.component';
import { StatsComponent } from './components/stats/stats.component';
import { CupEventComponent } from './components/cup-event/cup-event.component';
import { VideosComponent } from './components/videos/videos.component';
import { BlogComponent } from './components/blog/blog.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { DashboardEmployeeComponent } from './components/dashboard-employee/dashboard-employee.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ScoreComponent,
    NewsComponent,
    StatsComponent,
    CupEventComponent,
    VideosComponent,
    BlogComponent,
    ArticlesComponent,
    SignupComponent,
    LoginComponent,
    DashboardAdminComponent,
    AddTaskComponent,
    TasksTableComponent,
    EditTaskComponent,
    TaskInfoComponent,
    DashboardEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
