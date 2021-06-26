import { EstadoCivil } from './enums/estado-civil.enum';

export class Cliente {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  dni: string;
  telefono: string | null;
  fechaNacimiento: Date | null;
  estadoCivilId: EstadoCivil | null;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.dni = item?.dni ?? '';
    this.nombre = item?.nombre ?? '';
    this.apellidos = item?.apellidos ?? '';
    this.email = item?.email ?? '';
    this.telefono = item?.telefono ?? null;
    this.direccion = item?.direccion ?? '';
    this.estadoCivilId = item?.estadoCivilId ? item?.estadoCivilId : null;
    this.fechaNacimiento = item?.fechaNacimiento
      ? new Date(item.fechaNacimiento)
      : null;
  }
}
