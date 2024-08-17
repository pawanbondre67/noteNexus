import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanatizeHtmlPipe } from '../pipe/sanatize-html/sanatize-html.pipe';



@NgModule({
  declarations: [ SanatizeHtmlPipe],
  imports: [
    CommonModule
  ],
  exports: [SanatizeHtmlPipe ]
})
export class SharedModule { }
