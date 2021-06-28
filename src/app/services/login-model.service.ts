import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from '../login/login-model';
import { Usuario } from '../models/usuario';

/**
 * Este servicio sabe como gestionar con la API
 * si el usuario tiene acceso a la aplicación
 */
@Injectable({
  providedIn: 'root',
})
export class LoginModelService {
  private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  login(values: {
    email: string;
    password: string;
  }): Observable<Usuario | null> {
    return this.http
      .post<Usuario>(`${this.url}/login`, values, { observe: 'response' })
      .pipe(
        map((u) => {
          return new Usuario(u.body);
        }),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            console.log('La api ha muerto');
          }
          console.log(e.message);
          return of(null);
        })
      );
  }
}
