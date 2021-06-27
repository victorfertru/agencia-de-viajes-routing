import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TiposDeViajes } from '../models/tiposDeViajes';

@Injectable({
  providedIn: 'root',
})
export class TiposDeViajesModelService {
  private url = 'http://localhost:3000/viajes/tiposDeViaje';
  constructor(private http: HttpClient) {}

  getAll(): Observable<TiposDeViajes[]> {
    return this.http.get<TiposDeViajes[]>(`${this.url}`).pipe(
      map((tipos) =>
        tipos.map((e: TiposDeViajes) => {
          return new TiposDeViajes(e);
        })
      )
    );
  }
}
