import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { MyAppComponent } from './my-app/my-app.component';
import { AuthGuard } from './login-register/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuard] },
  {path: 'myapp', component: MyAppComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent, RegisterComponent, MyAppComponent]
