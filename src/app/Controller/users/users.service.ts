import { Injectable } from '@angular/core';
import { Auth } from 'src/app/Model/Auth';
import { User } from 'src/app/Model/User';
import { Repository } from '../Repository';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements Repository<User> {
  constructor() {}

  save(user: User): User
  {
    let users = this.getAllWithPassword();
    user.id = Math.floor(Date.now() * Math.random()).toString(36);
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    return user;
  }

  getAll(): User[]
  {
    const usersData = localStorage.getItem("users");
    const usersParsedData = JSON.parse(usersData == null ? "[]" : usersData);
    const users = usersParsedData.map( ({password, ...keep}:{password: string, keep: User}) => keep ); // removing "password" property from "users" object
    return users;
  }

  findById(id: string): User
  {
    const users = this.getAll();
    const user = users.filter( user => user.id === id );
    return user[0];
  }

  update(currentUser: User): void
  {
    let users = this.getAllWithPassword();

    users = users.map( (user: User) => {
      if ( user.id === currentUser.id )
      {
        user.name = currentUser.name,
        user.email = currentUser.email
      }
      return user;
    } )
    localStorage.setItem("users", JSON.stringify(users));
  }

  delete(id: string): User
  {
    let users = this.getAllWithPassword();
    const currentUser = this.findById(id);

    users = users.filter( (user: User) => user.id !== id );
    localStorage.setItem("users", JSON.stringify(users));

    return currentUser;
  }

  getAllWithPassword(): User[]
  {
    const usersData = localStorage.getItem("users");
    let users = JSON.parse(usersData == null ? "[]" : usersData);

    return users;
  }

  login(authInfo: Auth): User[]
  {
    const usersParsedData = this.getAllWithPassword();

    const currentUser = usersParsedData.filter( (user: User) =>
      user.name === authInfo.username &&
      user.password === authInfo.password
    );

    return currentUser;
  }
}
