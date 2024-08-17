import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.scss'
})
export class ViewArticleComponent implements OnInit{

  article : any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData :any,
         public themeService : ThemeService) { }

  ngOnInit(): void {
    this.article = this.dialogData.data;
  }

}
