import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MaterialModule } from '../shared/material/material.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UsersComponent } from './dialog/users/users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageCategoryComponent } from './manage-category/manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ManageArticleComponent } from './manage-article/manage-article/manage-article.component';
import { ArticleComponent } from './dialog/article/article/article.component';
import { ViewArticleComponent } from './dialog/view-article/view-article/view-article.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HelpDetailsComponent,
    ConfirmationComponent,
    ManageUsersComponent,
    UsersComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageArticleComponent,
    ArticleComponent,
    ViewArticleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    SharedModule
  ],
  exports: [
    DashboardComponent,
    LayoutComponent,
    HelpDetailsComponent,
    ConfirmationComponent
  ]
})
export class AdminModule { }
