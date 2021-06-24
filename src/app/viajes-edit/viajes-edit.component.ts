import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TipoDeViaje } from '../models/enums/tipo-de-viaje.enum';
import { Viaje } from '../models/viaje';
import { IdValor } from '../services/id-valor';

@Component({
  selector: 'app-viajes-edit',
  templateUrl: './viajes-edit.component.html',
  styleUrls: ['./viajes-edit.component.scss'],
})
export class ViajesEditComponent implements OnInit, OnChanges {
  @Input() viaje: Viaje | null = null;
  @Input() tiposDeViaje: IdValor[] = [];
  @Output() guardar = new EventEmitter<Viaje>();

  submited = false;

  viajesForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.viajesForm = fb.group({
      id: [''],
      nombre: ['', Validators.required],
      tipoDeViajeId: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      destino: ['', [Validators.required, this.validarDestino]],
      plazas: ['', [Validators.required, Validators.min(1)]],
      enOferta: [null],
      precio: [null, [Validators.max(999999)]],
      estado: [null],
      fecha: [null],
    });
  }

  ngOnInit(): void {
    this.viajesForm.controls.destino.valueChanges.subscribe((x: string) => {
      // if (x?.toLowerCase() === 'málaga') {
      //   this.viajesForm.controls.enOferta.setValue(true);
      // }

      if (x?.toLowerCase() === 'kenia') {
        this.viajesForm.controls.enOferta.disable();
      } else {
        this.viajesForm.controls.enOferta.enable();
      }
    });

    this.viajesForm.controls.tipoDeViajeId.valueChanges.subscribe(
      (x: TipoDeViaje) => {
        if (x === TipoDeViaje.Familiar && this.viaje?.precio) {
          this.viajesForm.controls.precio.setValue(this.viaje?.precio * 0.8);
        }
      }
    );

    this.viajesForm.valueChanges.subscribe((x) => {
      //   console.log(x);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.viaje) {
      this.viajesForm.patchValue(changes.viaje.currentValue);
      if (changes.viaje.currentValue?.fechaSalida) {
        const t = this.formatFecha(changes.viaje.currentValue.fechaSalida);

        this.viajesForm.controls.fecha.setValue(t);
      }
    }
  }

  guardarClick(form: FormGroup): void {
    this.submited = true;
    if (form.valid) {
      const viaje: Viaje = form.value;
      if (form.value.fecha) {
        viaje.fechaSalida = new Date(form.value.fecha);
      }

      this.guardar.emit(new Viaje(viaje));

      this.resetForm();
    }
  }

  resetForm() {
    this.submited = false;
    this.viajesForm.reset();
  }
  validarDestino(control: FormControl): { [s: string]: boolean } | null {
    if (control.value?.toLowerCase() === 'londres') {
      return { invalidDestiny: true };
    }
    return null;
  }

  private formatFecha(date: Date): string {
    const y = date.getFullYear();
    let m: string | number = date.getMonth() + 1;
    let d: string | number = date.getDate();
    if (m < 10) {
      m = `0${m}`;
    }
    if (d < 10) {
      d = `0${d}`;
    }

    return `${y}-${m}-${d}`;
  }
}
