import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { Viaje } from '../models/viaje';
import { map } from 'rxjs/operators';
import { ViajesFilter } from '../models/viajesFilter';

@Injectable({
  providedIn: 'root',
})
export class ViajesModelService {
  private url = 'http://localhost:3000/viajes';

  constructor(private http: HttpClient) {}

  getViajes(): Observable<Viaje[]> {
    return (
      this.http
        .get<Viaje[]>(`${this.url}`)
        //.pipe(map((x) => x.map((v) => new ViajeList(v))));
        .pipe(
          map((x) =>
            x.map((v: any) => {
              const viaje = new Viaje(v);
              viaje.tipoDeViajeDesc = v.tipoDeViaje?.tipoDeViajeDesc ?? '';
              return viaje;
            })
          )
        )
    );
  }

  getViajeById(id: string): Observable<Viaje> {
    return this.http
      .get<Viaje>(`${this.url}/${id}`)
      .pipe(map((x) => new Viaje(x)));
  }

  buscar(filtro: ViajesFilter): Observable<Viaje[] | []> {
    const { tipoDeViajeId, nombre, destino } = filtro;

    let httpP = new HttpParams();
    if (filtro?.tipoDeViajeId) {
      httpP = httpP.set('tipoDeViajeId', tipoDeViajeId);
    }
    if (filtro?.nombre) {
      httpP = httpP.set('nombre', nombre);
    }
    if (filtro?.destino) {
      httpP = httpP.set('destino', destino);
    }
    return this.http
      .get<Viaje[] | []>(`${this.url}/search`, { params: httpP })
      .pipe(
        map((x) =>
          x.map((v: any) => {
            const viaje = new Viaje(v);
            viaje.tipoDeViajeDesc = v.tipoDeViaje?.tipoDeViajeDesc ?? '';
            return viaje;
          })
        )
      );

    //  const params = `tipoDeViajeId=${tipoDeViajeId}&nombre=${nombre}&destino=${destino}`;
    // return this.http
    //   .get<Viaje[] | []>(`${this.url}/search?${params}`)
    //   .pipe(map((x) => x.map((v: Viaje) => new Viaje(v))));
  }

  guardar(viaje: Viaje): Observable<Viaje | null> {
    if (!viaje) {
      return of(null);
    }

    if (viaje.id) {
      return this.http
        .put<Viaje>(`${this.url}/${viaje.id}`, viaje)
        .pipe(map((x) => new Viaje(x)));
    }

    //crear nuevo viaje
    return this.http
      .post<Viaje>(`${this.url}`, viaje)
      .pipe(map((x) => new Viaje(x)));
  }

  eliminar(id: string): Observable<boolean | null> {
    if (id) {
      // return this.http
      //   .delete<ViajeDelete>(`${this.url}/${id}`)
      //   .pipe(map((x) => x.deleted));
      return this.http
        .delete<boolean>(`${this.url}/${id}`, { observe: 'response' })
        .pipe(map((x) => x.status === HttpStatusCode.NoContent));
    }
    return of(null);
  }
}
