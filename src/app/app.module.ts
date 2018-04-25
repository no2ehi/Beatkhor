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
import { NavbarComponent } from './navbar/navbar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { IndexComponent } from './index/index.component';
// Added Services
import { MainService } from './services/main.service';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainHeaderComponent,
    RegisterLoginComponent,
    IndexComponent,
    HomePageComponent
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
