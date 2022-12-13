import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Controller/users/users.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userId: string = "";
  userInfo: User | null = null;

  constructor(private route: ActivatedRoute, private usersDB: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
    });

    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userInfo = this.usersDB.findById(this.userId);
  }

  putUser(user: User, currentUser: User): void
  {
    user.id = currentUser.id;

    this.usersDB.update(user);
    alert("Informações atualizadas com sucesso");
  }

}
