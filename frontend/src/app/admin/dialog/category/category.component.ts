import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from '../../../services/theme/theme.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { GlobalConstants } from '../../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();

  categoryForm : any =FormGroup;
  dialogAction : any = 'Add';
  action : any = 'Add';
  responseMessage : any = '';


  constructor( @Inject(MAT_DIALOG_DATA) public dialogData :any,
private formBuilder : FormBuilder,
private ngxService : NgxUiLoaderService,
public dialogRef : MatDialogRef<CategoryComponent>,
public themeService : ThemeService,
private snackbarService : SnackbarService,
private categoryService : CategoryService) { }


ngOnInit(): void {
  this.categoryForm = this.formBuilder.group({
    name : ['' , [Validators.required]],
  });

  if(this.dialogData.action === 'Edit'){
    this.dialogAction = 'Edit';
    this.action = 'Update';
    this.categoryForm.patchValue(this.dialogData.data);
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
  var data = {
    name : this.categoryForm.value.name
 };

 this.categoryService.addNewCategory(data).subscribe((response : any) => {
  this.ngxService.stop();
  this.dialogRef.close();
  this.onAddCategory.emit();
  this.responseMessage = response.message;
  this.snackbarService.openSnackBar(this.responseMessage);

},(error: any) => {
  this.handleError(error);
});


  }


edit(){

  this.ngxService.start();
  var data = {
    id : this.dialogData.data.id,
    name : this.categoryForm.value.name
 };

 this.categoryService.updateCategory(data).subscribe((response : any) => {
  this.ngxService.stop();
  this.dialogRef.close();
  this.onEditCategory.emit();
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
