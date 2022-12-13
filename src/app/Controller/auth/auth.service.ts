import { UsersService } from './../users/users.service';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/Model/Auth';
import { User } from 'src/app/Model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: string;
  newUser: boolean;

  constructor(private userDB: UsersService) {
    this.userLogged = "";
    this.newUser = false;

    this.setUserLogged(localStorage.getItem("user-logged")!);
  }

  postLogin(authInfo: Auth): void
  {
    let user = this.userDB.login(authInfo);

    if (user.length === 1)
      this.setUserLogged(user[0].id!)
    else
    {
      this.setUserLogged("")
      alert("Usuário inválido!");
    }
  }

  postRegister(user: User): User | boolean
  {
    // ? Object.entries() iterate properties in the same order as a for...in loop
    // ? but ignore the prototype chain.
    for (const [key, value] of Object.entries(user)) {
      if (value == "") {
        alert("Por favor, preencha todos os campos");
        return false;
      }
    }

    const saveNewUser = this.userDB.save(user);
    return saveNewUser ? saveNewUser : false;
  }

  logout(): void
  {
    this.setUserLogged("")
    alert("Você saiu do sistema com sucesso!");
    location.reload();
  }

  setUserLogged(val: string): void
  {
    val = val == null ? "" : val;
    this.userLogged = val;
    localStorage.setItem("user-logged", val!);
  }

}
