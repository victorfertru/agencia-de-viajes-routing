import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoDeViaje } from '../models/enums/tipo-de-viaje.enum';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajesFilter';
import { IdValor } from '../services/id-valor';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss'],
})
export class ViajesListComponent implements OnInit {
  @Output() editar = new EventEmitter<string>();
  @Output() eliminar = new EventEmitter<Viaje>();
  @Output() buscar = new EventEmitter<ViajesFilter>();

  @Input() viajes: Viaje[] = [];
  @Input() tiposDeViaje: IdValor[] = [];

  mostrarTarjetas = true;

  constructor() {}

  ngOnInit(): void {}

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }
}
