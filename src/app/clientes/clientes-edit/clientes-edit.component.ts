import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClientesModelService } from '../services/clientes-model.service';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss'],
})
export class ClientesEditComponent implements OnInit {
  id: string = '';

  cliente: Cliente | null = null;

  clientesForm: FormGroup;
  submited = false;

  constructor(
    private router: Router,
    route: ActivatedRoute,
    fb: FormBuilder,
    private clientesModel: ClientesModelService
  ) {
    route.params.subscribe((params) => {
      this.id = params.id || '';
    });

    this.clientesForm = fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.min(3)]],
      apellidos: ['', [Validators.required, Validators.min(5)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.min(10)]],
      dni: ['', Validators.required],
      telefono: [''],
      fechaNacimiento: [null],
      estadoCivilId: [null],
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.clientesModel.getById(this.id).subscribe((cliente) => {
        if (cliente) {
          this.clientesForm.patchValue(cliente);
          console.log(cliente.fechaNacimiento);
          if (cliente?.fechaNacimiento) {
            const formatdate = this.formatFecha(cliente?.fechaNacimiento);
            this.clientesForm.controls.fechaNacimiento.setValue(formatdate);
          }
        }
      });
    }
  }

  guardarClick(form: FormGroup): void {
    this.submited = true;
    if (form.valid) {
      const cliente: Cliente = form.value;
      if (form.value.fecha) {
        cliente.fechaNacimiento = new Date(form.value.fecha);
      }
      this.clientesModel.save(cliente).subscribe(() => {
        this.router.navigate(['clientes']);
      });
    }
  }
  resetForm() {
    this.submited = false;
    this.clientesForm.reset();
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