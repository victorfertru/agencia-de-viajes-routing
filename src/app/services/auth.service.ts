import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly APP_USER = 'APP_USER';

  constructor() {}

  storeUser(usuario: Usuario) {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
  }

  get bearer(): string {
    const b = localStorage.getItem(this.APP_USER);
    if (b) {
      const user: Usuario = JSON.parse(b);
      return user.bearer;
    }

    return '';
  }

  get isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  logOut(): void {
    localStorage.removeItem(this.APP_USER) !== null;
  }
}
