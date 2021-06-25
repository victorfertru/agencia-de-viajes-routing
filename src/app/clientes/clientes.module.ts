import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';

import { ClientesListComponent } from './clientes-list/clientes-list.component';

@NgModule({
  declarations: [ClientesListComponent],
  imports: [CommonModule, ClientesRoutingModule],
})
export class ClientesModule {}
