import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Added Modules
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpINterceptor } from './http-interceptor';
// Added Components
import { MainHeaderComponent } from './main-header/main-header.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginNavbarComponent } from './navbar/login-navbar/login-navbar.component';
import { PrimaryNavbarComponent } from './navbar/primary-navbar/primary-navbar.component';
// Added Services
import { MainService } from './services/main.service';
import { LoginFormComponent } from './register-login/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    RegisterLoginComponent,
    HomePageComponent,
    LoginNavbarComponent,
    PrimaryNavbarComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    MainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpINterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
