import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatFecha } from 'src/app/utils/dates-helpers';
import { Cliente } from '../models/cliente';
import { EstadoCivil } from '../models/estadoCivil';
import { ClientesModelService } from '../services/clientes-model.service';
import { EstadosCivilesModelService } from '../services/estados-civiles-model.service';
@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss'],
})
export class ClientesEditComponent implements OnInit {
  id: string = '';

  cliente: Cliente | null = null;
  estadosCiviles: EstadoCivil[] = [];

  clientesForm: FormGroup;
  submited = false;

  constructor(
    private router: Router,
    route: ActivatedRoute,
    fb: FormBuilder,
    private clientesModel: ClientesModelService,
    private estadosCivilesModel: EstadosCivilesModelService
  ) {
    route.params.subscribe((params) => {
      this.id = params.id || '';
    });

    this.clientesForm = fb.group({
      id: [''],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      direccion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(70),
        ],
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      telefono: [null],
      fechaNacimiento: [null],
      estadoCivilId: [null],
    });
  }

  ngOnInit(): void {
    this.estadosCivilesModel.getAll().subscribe((data) => {
      this.estadosCiviles = data;
    });

    if (this.id) {
      this.clientesModel.getById(this.id).subscribe((cliente) => {
        if (cliente) {
          this.clientesForm.patchValue(cliente);
          if (cliente?.fechaNacimiento) {
            const formatdate = formatFecha(cliente?.fechaNacimiento);
            this.clientesForm.controls.fechaNacimiento.setValue(formatdate);
          }
        }
      });
    }
  }

  guardarClick(form: FormGroup): void {
    this.submited = true;
    if (form.valid) {
      const cliente: Cliente = new Cliente(form.value);
      if (form.value.fechaNacimiento) {
        cliente.fechaNacimiento = new Date(form.value.fechaNacimiento);
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
}
