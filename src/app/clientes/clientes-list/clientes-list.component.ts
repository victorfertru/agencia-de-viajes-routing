import { Component, OnInit } from '@angular/core';
import { ClientesModelService } from '../services/clientes-model.service';
import { ClienteListItem } from '../models/clientes-list-item';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {
  clientes: ClienteListItem[] = [];
  constructor(private clientesModel: ClientesModelService) {}

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe((data) => {
      this.clientes = data;
    });
  }
  editarClick(id: string): void {}

  borrarClick(id: string): void {}
}
