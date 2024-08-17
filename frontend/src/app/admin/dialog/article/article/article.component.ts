import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ThemeService } from '../../../../services/theme/theme.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { ArticleService } from '../../../../services/articles/article.service';
import { GlobalConstants } from '../../../../shared/global-constants';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  onAddArticle = new EventEmitter();
  onEditArticle = new EventEmitter();

  articleForm : any = FormGroup;
  dialogAction : any = 'Add';
  action : any = 'Add';
  categorys : any ;
  responseMessage : any;





  constructor( @Inject(MAT_DIALOG_DATA) public dialogData :any,
private formBuilder : FormBuilder,
private ngxService : NgxUiLoaderService,
public dialogRef : MatDialogRef<ArticleComponent>,
public themeService : ThemeService,
private snackbarService : SnackbarService,
private categoryService : CategoryService,
private articleService : ArticleService) { }

ngOnInit(): void {
  this.articleForm = this.formBuilder.group({
    title : ['' , [Validators.required]],
    content : [null, [Validators.required]],
    categoryId : ['', [Validators.required]],
    status : ['',[Validators.required]],
  });

  if(this.dialogData.action === 'Edit'){
    this.dialogAction = 'Edit';
    this.action = 'Update';
    this.articleForm.patchValue(this.dialogData.data);
  }

  this.getAllCategory();
  this.ngxService.start();

}

getAllCategory(){
  this.categoryService.getAllCategories().subscribe((response : any) => {
    this.categorys = response;
    this.ngxService.stop();
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


handleSubmit(){
  if(this.dialogAction === 'Edit'){
    this.edit();
  }
  else{
    this.add();
  }
}

add(){

  this.ngxService.start();
  var formData = this.articleForm.value;
  var data = {
    title : formData.title,
    content : formData.content,
    categoryId : formData.categoryId,
    status : formData.status
  }

  this.articleService.addNewArticle(data).subscribe((response : any) => {
    this.dialogRef.close();
    this.ngxService.stop();
    this.onAddArticle.emit();
    this.responseMessage = response.message;
    this.snackbarService.openSnackBar(this.responseMessage);

  }
  , (error : any) => {
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

edit(){
  this.ngxService.start();
  var formData = this.articleForm.value;
  var data = {
    id : this.dialogData.data.id,
    title : formData.title,
    content : formData.content,
    categoryId : formData.categoryId,
    status : formData.status
  }

  this.articleService.updateArticle(data).subscribe((response : any) => {
    this.dialogRef.close();
    this.ngxService.stop();
    this.onEditArticle.emit();
    this.responseMessage = response.message;
    this.snackbarService.openSnackBar(this.responseMessage);

  }
  , (error : any) => {
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

}
