export class Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
  bearer: string;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.name = item?.name ?? '';
    this.email = item?.email ?? '';
    this.role = item?.role ?? '';
    this.bearer = item?.bearer ?? '';
  }
}
