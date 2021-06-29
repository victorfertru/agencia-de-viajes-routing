import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente } from '../models/cliente';
import { ClienteListItem } from '../models/clientes-list-item';

@Injectable({
  providedIn: 'root',
})
export class ClientesModelService {
  private url = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClienteListItem[]> {
    return this.http.get<ClienteListItem[]>(`${this.url}`).pipe(
      map((x) =>
        // x.map((c) => new ClienteListItem(c))
        // TODO preguntar a jose qué poner en lugar de any para que funcione bien
        x.map((c: any) => {
          const cliente = new ClienteListItem(c);
          cliente.estadoCivilDesc = c.estadoCivil?.estadoCivilDesc ?? '';
          return cliente;
        })
      )
    );
  }

  getById(id: string): Observable<Cliente | null> {
    if (!id) {
      return of(null);
    }
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      map((cliente) => {
        return new Cliente(cliente);
      })
    );
  }

  save(cliente: Cliente): Observable<Cliente | null> {
    if (!cliente) {
      return of(null);
    }

    return cliente?.id
      ? this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente).pipe(
          map((cliente) => {
            return new Cliente(cliente);
          })
        )
      : this.http.post<Cliente>(`${this.url}`, cliente).pipe(
          map((cliente) => {
            return new Cliente(cliente);
          })
        );
  }

  delete(id: string): Observable<boolean> {
    return id
      ? this.http
          .delete<HttpResponse<any>>(`${this.url}/${id}`, {
            observe: 'response',
          })
          .pipe(map((res) => res.status === HttpStatusCode.NoContent))
      : of(false);
  }
}
