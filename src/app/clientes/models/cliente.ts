import { EstadoCivil } from './enums/estado-civil.enum';

export class Cliente {
  id: string;
  nombre: string;
  dni: string;
  telefono: string;
  direccion: string;
  estadoCivilId: EstadoCivil | null;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.dni = item?.dni ?? '';
    this.nombre = item?.nombre ?? '';
    this.telefono = item?.telefono ?? '';
    this.direccion = item?.direccion ?? '';
    this.estadoCivilId = item?.estadoCivilId ?? null;
  }
}
