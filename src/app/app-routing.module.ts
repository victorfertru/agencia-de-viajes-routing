import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViajesEditComponent } from './viajes-edit/viajes-edit.component';
import { ViajesListComponent } from './viajes-list/viajes-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'viajes' },
  { path: 'viajes', component: ViajesListComponent },
  { path: 'viajes/editar', component: ViajesEditComponent },
  { path: 'viajes/editar/:id', component: ViajesEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
