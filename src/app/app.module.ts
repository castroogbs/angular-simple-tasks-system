import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Controller/auth/auth.service';
import { TasksService } from './Controller/tasks/tasks.service';
import { HomeComponent } from './View/home/home.component';
import { UsersComponent } from './View/users/users.component';
import { TasksComponent } from './View/components/tasks/tasks.component';
import { FormComponent } from './View/components/form/form.component';
import { UsersService } from './Controller/users/users.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    UsersComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, TasksService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
