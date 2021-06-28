import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { LoginModelService } from '../services/login-model.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  token: string = '';
  loginForm: FormGroup;
  submited = false;
  constructor(
    private router: Router,
    private loginModel: LoginModelService,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // login(form: FormGroup): void {
  //   this.submited = true;
  //   if (form.valid) {
  //     this.loginModel.login(form.value).subscribe(
  //       (res) => {
  //         this.token = res;
  //         console.log(res);
  //         this.router.navigate(['/viajes']);
  //       },
  //       (err) => {
  //         console.log('Error ' + err.error.message);
  //       }
  //     );
  //   }
  // }

  // Form declarativo
  error = false;
  email = '';
  //usuario: Usuario;

  login(values: { email: string; password: string }): void {
    this.submited = true;
    if (values?.email && values?.password) {
      this.loginModel.login(values).subscribe((x) => {
        if (x) {
          this.authService.storeUser(x);
          this.router.navigate(['']);
        } else {
          this.error = true;
        }
      });
    } else {
      this.error = true;
    }
  }
}
