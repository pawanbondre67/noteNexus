import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanatizeHtml'
})
export class SanatizeHtmlPipe implements PipeTransform {

  constructor(private domSanatizer : DomSanitizer) {}

  transform(value: string): SafeHtml {

    return this.domSanatizer.bypassSecurityTrustHtml(value);
  }

}
