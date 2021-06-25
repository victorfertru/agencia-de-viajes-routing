import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { TipoDeViaje } from '../models/enums/tipo-de-viaje.enum';
import { Viaje } from '../models/viaje';
import { IdValor } from './id-valor';
import { map } from 'rxjs/operators';
import { ViajeDelete } from '../models/viajeDelete';
import { ViajesFilter } from '../models/viajesFilter';

@Injectable({
  providedIn: 'root',
})
export class ViajesModelService {
  private tiposDeViaje: IdValor[] = [
    { id: 1, valor: 'Familiar' },
    { id: 2, valor: 'Trabajo' },
    { id: 3, valor: 'LunaDeMiel' },
    { id: 4, valor: 'Ahora mismo, por favor' },
    { id: 5, valor: 'Aventura' },
    { id: 6, valor: 'Cultural' },
    { id: 7, valor: 'Luxuxy' },
    { id: 8, valor: 'Gastronómico' },
  ];

  private url = 'http://localhost:3000/viajes';

  constructor(private http: HttpClient) {}

  getViajes(): Observable<Viaje[]> {
    // aquí dejamos la petición.
    // Nos suscribimos DÓNDE utilicemos el getViajes para que cuadren los tipos que devolvemos
    return this.http
      .get<Viaje[]>(`${this.url}`)
      .pipe(map((x) => x.map((v) => new Viaje(v))));
    //para que la primera vez funcione, hay que importar algún operador import { map } from 'rxjs/operators';
    // Un pipe es un "transformador". Es una tubería que aplica un cambio sobre lo que viaja por ella
    // el primer map es el que hemos importado de rxjs,
    // se aplica sobre las cosas que van en el observable
    // el resultado del primer map opera sobre un objeto array COMPLETO
    // el segundo map  opera sobre CADA OBJETO DEL ARRAY
  }

  // getViajes(): Viaje[] {
  //   return [...this.viajes];
  // }

  getViajeById(id: string): Observable<Viaje> {
    //return this.viajes.find((x) => x.id === id);
    return this.http
      .get<Viaje>(`${this.url}/${id}`)
      .pipe(map((x) => new Viaje(x)));
  }

  buscar(filtro: ViajesFilter): Observable<Viaje[] | []> {
    //return this.viajes.find((x) => x.id === id);
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
      .pipe(map((x) => x.map((v: Viaje) => new Viaje(v))));

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

      // const idx = this.viajes.findIndex((x) => x.id === viaje.id);

      // if (idx >= 0) {
      //    this.viajes[idx] = { ...viaje };
      //     return this.viajes[idx];
      // }
    }

    //crear nuevo viaje
    return this.http
      .post<Viaje>(`${this.url}`, viaje)
      .pipe(map((x) => new Viaje(x)));
    // this.viajes.push({ ...viaje, id: `viaje_${this.id++}` });
    // return this.viajes[this.viajes.length - 1];
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

  // TODO traer de BBDD
  getTiposDeViajes(): IdValor[] {
    return this.tiposDeViaje;
  }

  // TODO traer de BBDD
  getTipoViajeById(tipoId: string): IdValor | null {
    if (tipoId) {
      const idx = this.tiposDeViaje.findIndex((x) => x.id === tipoId);
      if (idx >= 0) {
        return this.tiposDeViaje[idx];
      }
    }
    return null;
  }
}
