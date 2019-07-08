import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  signupForm: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.signupForm =  new FormGroup({
      fname: new FormControl('', [
        Validators.required,
      ]),
      lname: new FormControl('', [
        Validators.required,
      ]),
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

  // submit SignUp Form
  submitsignupForm(form: FormGroup) {
    if (form.invalid) {
      this.isLoading = false;
      return;
    }
    console.log(form.controls.fname.value);
    this.isLoading = true;

    const user = {
      name: form.controls.fname.value + ' ' + form.controls.lname.value,
      email: form.controls.email.value,
      password: form.controls.password.value,
      profileImage: null
    };

    this.authService.creatUser(user)
      .subscribe( response => {
        console.log(response);
        this.isLoading = false;
        form.reset();
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

}
