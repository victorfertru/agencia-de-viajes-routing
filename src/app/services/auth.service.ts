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

  get isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  logOut(): void {
    localStorage.removeItem(this.APP_USER) !== null;
  }
}
