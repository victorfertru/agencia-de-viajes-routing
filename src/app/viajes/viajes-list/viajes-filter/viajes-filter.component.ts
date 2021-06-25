import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViajesFilter } from '../../models/viajesFilter';

import { IdValor } from '../../services/id-valor';

@Component({
  selector: 'app-viajes-filter',
  templateUrl: './viajes-filter.component.html',
  styleUrls: ['./viajes-filter.component.scss'],
})
export class ViajesFilterComponent implements OnInit {
  @Input() tiposDeViaje: IdValor[] = [];
  @Output() buscar = new EventEmitter<ViajesFilter>();
  filterForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.filterForm = fb.group({
      nombre: [''],
      tipoDeViajeId: [''],
      destino: [''],
    });
  }

  ngOnInit(): void {}

  searchClick(form: FormGroup): void {
    if (form.valid) {
      // if (!form.value.nombre) form.value.nombre = '';
      // if (!form.value.tipoDeViajeId) form.value.tipoDeViajeId = '';
      // if (!form.value.destino) form.value.destino = '';

      const filtro = form.value;

      this.buscar.emit(new ViajesFilter(filtro));
    }
  }

  limpiarFiltro(form: FormGroup): void {
    this.filterForm.reset();
    this.buscar.emit(new ViajesFilter());
  }
}
