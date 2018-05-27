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
import { ReactiveFormsModule } from '@angular/forms';
// Added Components
import { MainHeaderComponent } from './headers/main-header/main-header.component';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginNavbarComponent } from './navbars/login-navbar/login-navbar.component';
import { PrimaryNavbarComponent } from './navbars/primary-navbar/primary-navbar.component';
import { LoginFormComponent } from './pages/register-login/login-form/login-form.component';
import { RegisterFormComponent } from './pages/register-login/register-form/register-form.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PanelComponent } from './pages/panel/panel.component';
import { PanelNavComponent } from './navbars/panel-nav/panel-nav.component';
import { PanelDashboardComponent } from './pages/panel/panel-dashboard/panel-dashboard.component';
import { PanelPostsComponent } from './pages/panel/panel-posts/panel-posts.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { PanelCategoryComponent } from './pages/panel/panel-category/panel-category.component';
// Added Services
import { MainService } from './services/main.service';
import { CommonService } from './services/common.service';
import { AuthService } from './services/auth.service';
import { PersianNumberPipe } from './pipes/persian-number.pipe';
import { JalaaliDatePipe } from './pipes/jalaali-date.pipe';
import { AddCategoryComponent } from './pages/panel/panel-category/add-category/add-category.component';
import { DisplayCategoriesComponent } from './pages/panel/panel-category/display-categories/display-categories.component';
import { OrderByIndexPipe } from './pipes/order-by-index.pipe';
import { DeleteCategoryDialogComponent } from './pages/panel/panel-category/delete-category-dialog/delete-category-dialog.component';
import { EditCategoryDialogComponent } from './pages/panel/panel-category/edit-category-dialog/edit-category-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    RegisterLoginComponent,
    LoginNavbarComponent,
    PrimaryNavbarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    IndexComponent,
    PanelComponent,
    PanelNavComponent,
    PanelDashboardComponent,
    PanelPostsComponent,
    ConfirmDialogComponent,
    PanelCategoryComponent,
    PersianNumberPipe,
    JalaaliDatePipe,
    AddCategoryComponent,
    DisplayCategoriesComponent,
    OrderByIndexPipe,
    DeleteCategoryDialogComponent,
    EditCategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    MainService,
    AuthService,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpINterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    DeleteCategoryDialogComponent,
    EditCategoryDialogComponent
  ]
})
export class AppModule { }
