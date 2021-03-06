import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'viajes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./viajes/viajes.module').then((m) => m.ViajesModule),
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
