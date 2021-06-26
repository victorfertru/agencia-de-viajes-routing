import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoCivil } from '../models/estadoCivil';

@Injectable({
  providedIn: 'root',
})
export class EstadosCivilesModelService {
  private url = 'http://localhost:3000/clientes/estadosCiviles';
  constructor(private http: HttpClient) {}

  getAll(): Observable<EstadoCivil[]> {
    return this.http.get<EstadoCivil[]>(`${this.url}`).pipe(
      map((estados) =>
        estados.map((e: EstadoCivil) => {
          return new EstadoCivil(e);
        })
      )
    );
  }
}
