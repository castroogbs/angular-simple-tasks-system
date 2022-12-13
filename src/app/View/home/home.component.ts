import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Controller/auth/auth.service';
import { UsersService } from 'src/app/Controller/users/users.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: string;
  userInfo: User | null;

  constructor(private userDB: UsersService, public auth: AuthService) {
    this.userId = localStorage.getItem("user-logged")!;
    this.userInfo = null;
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void
  {
    this.userInfo = this.userDB.findById(this.userId)
  }


}
