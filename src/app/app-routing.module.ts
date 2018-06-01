import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { PanelComponent } from './pages/panel/panel.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { IndexComponent } from './pages/index/index.component';
import { PanelDashboardComponent } from './pages/panel/panel-dashboard/panel-dashboard.component';
import { PanelPostsComponent } from './pages/panel/panel-posts/panel-posts.component';
import { PanelCategoryComponent } from './pages/panel/panel-category/panel-category.component';
import { PanelGenreComponent } from './pages/panel/panel-genre/panel-genre.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthService]
  },
  {
    path: 'p',
    component: PanelComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        redirectTo: '/p/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: PanelDashboardComponent,
        canActivate: [AuthService]
      },
      {
        path: 'manage_categories',
        component: PanelCategoryComponent,
        canActivate: [AuthService]
      },
      {
        path: 'manage_genres',
        component: PanelGenreComponent,
        canActivate: [AuthService]
      },
      {
        path: 'posts',
        component: PanelPostsComponent,
        canActivate: [AuthService]
      }
    ]
  },
  {
    path: 'login',
    component: RegisterLoginComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
