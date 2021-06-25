import { Pipe, PipeTransform } from '@angular/core';
import { TipoDeViaje } from './models/enums/tipo-de-viaje.enum';
import { ViajesModelService } from './services/viajes-model.service';

@Pipe({
  name: 'tipoDeViaje',
})
export class TipoDeViajePipe implements PipeTransform {
  constructor(private viajesModelService: ViajesModelService) {}
  transform(id: number): unknown {
    //
    // const tv = this.viajesModelService.getTipoViajeById(id);
    // return tv?.valor;

    // Otra forma utilizando el enum:
    // switch (id) {
    //   case TipoDeViaje.Familiar:
    //     return "Para todos los publicos";
    //     break;
    //   default:
    //     return "";
    // }

    // Otra forma utilizando el servicio SIN CREAR UNO NUEVO
    if (!id) {
      return ' - - - ';
    }
    const tiposViajes = this.viajesModelService.getTiposDeViajes();
    const v = tiposViajes.find((x) => x.id === id)?.valor;

    return v ? v : ' - - - ';
  }
}
