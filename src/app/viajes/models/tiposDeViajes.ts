export class TiposDeViajes {
  id: number;
  valor: string;

  constructor(item?: any) {
    this.id = item?.id ?? 0;
    this.valor = item?.valor ?? '';
  }
}
