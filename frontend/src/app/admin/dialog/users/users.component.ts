import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from '../../../services/theme/theme.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { UserService } from '../../../services/user/user.service';
import { GlobalConstants } from '../../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent  implements OnInit {
  onAddUser = new EventEmitter<void>();
  onEditUser = new EventEmitter<void>();

  usersForm : any =FormGroup;
  dialogAction : any = 'Add';
  action : any = 'Add';
  responseMessage : any = '';


  constructor( @Inject(MAT_DIALOG_DATA) public dialogData :any,
private formBuilder : FormBuilder,
private ngxService : NgxUiLoaderService,
public dialogRef : MatDialogRef<UsersComponent>,
public themeService : ThemeService,
private snackbarService : SnackbarService,
private userService : UserService) { }



ngOnInit(): void {
  this.usersForm = this.formBuilder.group({
    email : ['' , [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
    name : ['' , [Validators.required]],
    password : ['' , [Validators.required, Validators.minLength(4)]],
  });

  if(this.dialogData.action === 'Edit'){
    this.dialogAction = 'Edit';
    this.action = 'Update';
    this.usersForm.patchValue(this.dialogData.data);
    this.usersForm.controls['password'].setValue('password');
  }
}

handleSubmit(){
  if(this.dialogAction == 'Edit'){
    this.edit();
  }
  else{
    this.add();
  }

}

add(){
  this.ngxService.start();
 var  data = {
    email : this.usersForm.value.email,
    name : this.usersForm.value.name,
    password : this.usersForm.value.password,
  };

  this.userService.addNewUser(data).subscribe((response : any) => {
    this.ngxService.stop();
    this.dialogRef.close();
    this.onAddUser.emit();
    this.responseMessage = response.message;
    this.snackbarService.openSnackBar(this.responseMessage);

  },(error: any) => {
    this.handleError(error);
  });

  }


  edit(){
    this.ngxService.start();
   var  data = {
      email : this.usersForm.value.email,
      name : this.usersForm.value.name,
      id : this.dialogData.data.id,
    };

    this.userService.updateUser(data).subscribe((response : any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditUser.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage);

    },(error: any) => {
      this.handleError(error);
    });

    }


private handleError(error: any) {
  this.ngxService.stop();
  console.log(error);
  if (error.error?.message) {
    this.responseMessage = error.error?.message;
  } else {
    this.responseMessage = GlobalConstants.genericErrorMessage;
  }
  this.snackbarService.openSnackBar(this.responseMessage);
}


  }
