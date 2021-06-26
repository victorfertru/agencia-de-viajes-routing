export class EstadoCivil {
  id: number;
  descripcion: string;

  constructor(item?: any) {
    this.id = item?.id ?? 0;
    this.descripcion = item?.descripcion ?? '';
  }
}
