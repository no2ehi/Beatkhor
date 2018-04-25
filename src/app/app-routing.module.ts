import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IndexComponent } from './index/index.component';
import { MainService } from './services/main.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [MainService],
    children: [
      {
        path: '',
        component: HomePageComponent,
        canActivate: [MainService]
      }
    ]
  },
  {
    path: 'login',
    component: RegisterLoginComponent,
    canActivate: [MainService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
