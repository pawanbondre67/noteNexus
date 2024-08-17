import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThemeService } from '../../../services/theme/theme.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../../shared/global-constants';
import { CategoryComponent } from '../../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit'];
  dataSource : any;
  responseMessage: any;

  constructor(private categoryService : CategoryService,
    private router : Router,
    private ngxService : NgxUiLoaderService,
    private snackbarService : SnackbarService,
    private dialog : MatDialog,
    public themeService : ThemeService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();

  }

  tableData(){
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.ngxService.stop();
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
 } , (error : any) => {
  this.ngxService.stop();
  console.log(error);
  if(error.error?.message){
    this.responseMessage = error.error?.message;
  }
  else{
    this.responseMessage = GlobalConstants.genericErrorMessage;
  }

  this.snackbarService.openSnackBar(this.responseMessage);
}
  );
  }

  applyFilter(event : any){
    const filterValue =  (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
       action : 'Add'
     };

     dialogConfig.width = '500px';
     const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
     this.router.events.subscribe(() => {
       dialogRef.close();
     });

     const res = dialogRef.componentInstance.onAddCategory.subscribe((response) => {
       this.tableData();
     }
     );
  }

  handleEditAction(values : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
       action : 'Edit',
        data : values
     };

     dialogConfig.width = '500px';
     const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
     this.router.events.subscribe(() => {
       dialogRef.close();
     });

     const res = dialogRef.componentInstance.onEditCategory.subscribe((response) => {
       this.tableData();
     }
     );
  }

}
