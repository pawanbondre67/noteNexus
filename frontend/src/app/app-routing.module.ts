import { RouteguardService } from './services/routeguard/routeguard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '' , component: HomeComponent
  },
  {
    path: 'login' , component: LoginComponent 
  },
  {
    path: 'notenexus',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [RouteguardService]
  },
  {
    path: '**' , component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
