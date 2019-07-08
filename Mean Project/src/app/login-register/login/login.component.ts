import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginForm: FormGroup;

  constructor( private authService: AuthService, private fb: FormBuilder ) {}

  submitLoginForm(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const Email = form.controls.email.value;
    const Password = form.controls.password.value;

    this.authService.loginUser( Email, Password);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),
    });
  }

  get f() { return this.loginForm.controls; }
}
