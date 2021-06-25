import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoDeViaje } from '../models/enums/tipo-de-viaje.enum';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajesFilter';
import { IdValor } from '../services/id-valor';
import { ViajesModelService } from '../services/viajes-model.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss'],
})
export class ViajesListComponent implements OnInit {
  viajes: Viaje[] = [];
  tiposDeViaje: IdValor[] = [];

  mostrarTarjetas = true;

  constructor(
    private viajesModel: ViajesModelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarViajes();
    this.tiposDeViaje = this.viajesModel.getTiposDeViajes();
  }

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  searchClick(filtro: ViajesFilter): void {
    if (filtro) {
      this.viajesModel
        .buscar(filtro)
        .subscribe((viaje) => (this.viajes = viaje));
    }
  }

  eliminarClick(viaje: Viaje): void {
    if (
      viaje &&
      confirm(
        `¿Seguro que desea eliminar el viaje ${viaje.nombre} con destino ${viaje.destino}?`
      )
    ) {
      this.viajesModel.eliminar(viaje.id).subscribe((resultado) => {
        if (resultado) {
          this.cargarViajes();
        }
      });
    }
  }

  editarClick(id: string): void {
    if (id) {
      this.viajesModel.getViajeById(id).subscribe((viaje) => {
        if (viaje) {
          //this.viajeEdicion = viaje;
          this.router.navigate(['viajes/editar', id]);
        }
      });
    }
  }

  private cargarViajes() {
    // pido datos, me suscribo y en ese momento se ejecuta la petición.
    // los añado a mi lista de viajes
    this.viajesModel.getViajes().subscribe((x) => {
      // x crea array de objetos literales
      // this.viajes = x;
      // console.log(this.viajes);
      // creamos un array con objetos Viaje
      this.viajes = x;
    });
  }
}
