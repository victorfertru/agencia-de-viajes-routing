export class ClienteListItem {
  id: string;
  nombre: string;
  dni: string;
  telefono: string;
  estadoCivilDesc: string;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.dni = item?.dni ?? '';
    this.nombre = item?.nombre ?? '';
    this.telefono = item?.telefono ?? '';
    this.estadoCivilDesc = item?.estadoCivilDesc ?? '';
  }
}
