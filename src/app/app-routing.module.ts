import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthGuard} from './guards/auth-guard';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ChartPageComponent} from './pages/chart-page/chart-page.component';
import {TablePageComponent} from './pages/table-page/table-page.component';

export const routes: Routes = [
  { path: 'table', component: TablePageComponent, canActivate: [AuthGuard]},
  { path: 'charts', component: ChartPageComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent},
  { path: 'logout', redirectTo: 'login'},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
