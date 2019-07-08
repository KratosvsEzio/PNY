import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AsideModule } from './aside/aside.module';
import { SectionModule } from './section/section.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { AppComponent } from './app.component';
import { MyAppComponent } from './my-app/my-app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthInterceptor } from './login-register/auth-interceptor';
import { TestComponent } from './login-register/test/test.component';
import { MatInputModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { MessageSocketService } from './Service/message-socket.service';
@NgModule({
  declarations: [
    AppComponent,
    MyAppComponent,
    routingComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AsideModule,
    SectionModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule,
    LoginRegisterModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule,
  ],
  providers: [
    MessageSocketService,
    CookieService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
