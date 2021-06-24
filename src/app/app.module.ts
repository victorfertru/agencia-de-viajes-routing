import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TipoDeViajePipe } from './tipo-de-viaje.pipe';
import { ViajesEditComponent } from './viajes-edit/viajes-edit.component';
import { ViajesCardListComponent } from './viajes-list/viajes-card-list/viajes-card-list.component';
import { ViajesFilterComponent } from './viajes-list/viajes-filter/viajes-filter.component';
import { ViajesListComponent } from './viajes-list/viajes-list.component';
import { ViajesTableListComponent } from './viajes-list/viajes-table-list/viajes-table-list.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ViajesListComponent,
    ViajesCardListComponent,
    ViajesTableListComponent,
    ViajesFilterComponent,
    TipoDeViajePipe,
    ViajesEditComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
