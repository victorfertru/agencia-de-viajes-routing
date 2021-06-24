import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TipoDeViaje } from 'src/app/models/enums/tipo-de-viaje.enum';
import { Viaje } from 'src/app/models/viaje';

@Component({
  selector: 'app-viajes-card-list',
  templateUrl: './viajes-card-list.component.html',
  styleUrls: ['./viajes-card-list.component.scss'],
})
export class ViajesCardListComponent implements OnInit, OnChanges {
  @Input() viajes: Viaje[] = [];
  viajesCards: Viaje[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // utilizamos OnChanges por si los datos no son inmediatos y tardan un poco en llegar
    // de esta forma, comprobamos si hay cambios
    // if (changes.viajes) {
    //   this.viajes = [{
    //     id: '55sdfgasdf324<z111',
    //     nombre: "Desayuno con diamantes",
    //     tipoDeViajeId: TipoDeViaje.AhoraMismoPorFavor,
    //     duracion: 1,
    //     destino: "París",
    //     plazas: 5,
    //     enOferta: true,
    //     estado: 1,
    //   }, ...this.viajes];
    // }
  }
  ngOnInit(): void {}
}
