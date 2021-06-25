import { Component, OnInit } from '@angular/core';
import { ClientesModelService } from '../services/clientes-model.service';
import { ClienteListItem } from '../models/clientes-list-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {
  clientes: ClienteListItem[] = [];
  constructor(
    private clientesModel: ClientesModelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe((data) => {
      this.clientes = data;
    });
  }
  editarClick(id: string): void {
    if (id) {
      this.clientesModel.getById(id).subscribe((viaje) => {
        if (viaje) {
          //this.viajeEdicion = viaje;
          this.router.navigate(['clientes/editar', id]);
        }
      });
    }
  }

  borrarClick(cliente: ClienteListItem): void {
    if (
      cliente &&
      confirm(
        `¿Seguro que desea eliminar la cuenta de ${cliente.nombre} (${cliente.dni})?`
      )
    ) {
      this.clientesModel.delete(cliente.id).subscribe((resultado) => {
        if (resultado) {
          this.cargarClientes();
        }
      });
    }
  }

  private cargarClientes() {
    this.clientesModel.getAll().subscribe((x) => {
      this.clientes = x;
    });
  }
}
