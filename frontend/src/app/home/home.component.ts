import { Token } from '@angular/compiler';
import { ThemeService } from './../services/theme/theme.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticleService } from '../services/articles/article.service';
import { GlobalConstants } from '../shared/global-constants';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  articles : any;
  responseMessage : any;

  searchText : string = '';


  constructor(public themeService : ThemeService,
    private router : Router,
    private ngxService : NgxUiLoaderService,
    private snackbarService : SnackbarService,
    private dialog : MatDialog,
    private articleService : ArticleService
  ) {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.articleService.getAllPublishedArticle().subscribe((response : any) => {
      this.ngxService.stop();
      this.articles = response;
    }, (error : any) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
      this.responseMessage = GlobalConstants.genericErrorMessage;
      }

      this.snackbarService.openSnackBar(this.responseMessage);
    });
  }

  filteredItems(): any {
    return this.articles?.filter((item : any) =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  changeTheme(color: any){
    this.themeService.setTheme(color);
  }

  admin : boolean = false;
  loggedIn : boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.admin = true;
      this.loggedIn = true;
    }else{
      this.admin = false;
      this.loggedIn = false;
    }
  }

  handleViewAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action : 'Edit',
      data : values
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ArticleDetailsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }


}
