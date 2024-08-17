import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteguardService } from '../services/routeguard/routeguard.service';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageCategoryComponent } from './manage-category/manage-category/manage-category.component';
import { ManageArticleComponent } from './manage-article/manage-article/manage-article.component';

const routes: Routes = [
  {
    path : '' , component : LayoutComponent,
     children : [
      {
        path : '',
        component : DashboardComponent
      },
      {
        path : 'dashboard',
        component : DashboardComponent,
        canActivate : [RouteguardService]
      }
      ,
      {
        path : 'users',
        component : ManageUsersComponent,
        canActivate : [RouteguardService]
      },
      {
        path : 'article',
        component : ManageArticleComponent,
        canActivate : [RouteguardService]
      }
      ,
      {
        path : 'category',
        component : ManageCategoryComponent,
        canActivate : [RouteguardService]
      }
      ,
      {
        path : 'help',
        component : HelpDetailsComponent,
        canActivate : [RouteguardService]
      },
       {
        path : '**' , component : DashboardComponent,
        canActivate : [RouteguardService]
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
