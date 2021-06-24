import { TipoDeViaje } from './enums/tipo-de-viaje.enum';

// export interface Viaje {
//   id: string;
//   nombre: string;
//   tipoDeViajeId: TipoDeViaje;
//   duracion: number;
//   destino: string;
//   precio: number;
//   plazas: number;
//   enOferta: boolean;
//   estado: number;
//   fechaSalida: Date;
// }

export class Viaje {
  id: string;
  nombre: string;
  tipoDeViajeId: TipoDeViaje;
  duracion: number;
  destino: string;
  precio: number | null;
  plazas: number;
  enOferta: boolean | null;
  estado: number | null;
  fechaSalida: Date | null;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.nombre = item?.nombre ?? '';
    this.tipoDeViajeId = (item?.tipoDeViajeId || item?.TipoDeViajeId) ?? null;
    this.duracion = item?.duracion ?? 0;
    this.destino = item?.destino ?? '';
    this.plazas = item?.plazas ?? 0;
    this.precio = item?.precio ?? null;
    this.enOferta = item?.enOferta ?? false;
    this.estado = item?.estado ?? null;
    this.fechaSalida = item?.fechaSalida ? new Date(item.fechaSalida) : null;

    //  item?.nombre ?? ""; es igual a esto gracias a nullish coalescesing
    // if (item !== null && item !== undefined && item.nombre !== null && item.nombre !== undefined) {
    //   this.nombre = item.nombre;
    // }
    // else {
    //   this.nombre = "";
    // }
  }
}
