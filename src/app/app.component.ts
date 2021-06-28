import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'agencia-de-viajes-routing';
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    if (confirm('¿Seguro que desea cerrar la sesión?')) {
      this.authService.logOut();
      this.router.navigate(['login']);
    }
  }
}
