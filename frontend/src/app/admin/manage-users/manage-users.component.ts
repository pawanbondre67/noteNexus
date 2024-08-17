import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ThemeService } from '../../services/theme/theme.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { UsersComponent } from '../dialog/users/users.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'status', 'edit'];
  dataSource : any;
  responseMessage : any;


    constructor( private ngxService : NgxUiLoaderService,
      private dialog : MatDialog,
      private snackbarService : SnackbarService,
      private router : Router,
      private userService : UserService,
      public themeService : ThemeService
    ) { }

    ngOnInit(): void {
      this.ngxService.start();
      this.tableData();

    }

    tableData(){
      this.userService.getAllUsers().subscribe((response : any) => {
        this.ngxService.stop();
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
      }, (error : any) => {
        this.ngxService.stop();
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }

        this.snackbarService.openSnackBar(this.responseMessage);

      });

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
          const dialogRef = this.dialog.open(UsersComponent, dialogConfig);
          this.router.events.subscribe(() => {
            dialogRef.close();
          });

          const res = dialogRef.componentInstance.onAddUser.subscribe((response) => {
            this.tableData();
          }
          );
    }

    handleEditAction(values: any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
         action : 'Edit',
          data : values
       };

       dialogConfig.width = '500px';
       const dialogRef = this.dialog.open(UsersComponent, dialogConfig);
       this.router.events.subscribe(() => {
         dialogRef.close();
       });

       const res = dialogRef.componentInstance.onEditUser.subscribe((response) => {
         this.tableData();
       }
       );
    }

    handleDeleteAction(){

    }

    onChange(status :any , id : any){
      this.ngxService.start();
      var data = {
        id : id,
        status : status.toString()
      }
      this.userService.updateUserStatus(data).subscribe((response : any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage);
        this.tableData();
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
      });
    }
}
