import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'agencia-de-viajes-routing';
  elUsuarioEstaEnLogin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((ev: any) => {
        this.elUsuarioEstaEnLogin = ev?.url.toLowerCase().includes('login');
      });
  }

  logout(): void {
    if (confirm('¿Seguro que desea cerrar la sesión?')) {
      this.authService.logOut();
      this.router.navigate(['login']);
    }
  }
  isLogged(): boolean {
    return this.authService.isUserAuthenticated;
  }
}
