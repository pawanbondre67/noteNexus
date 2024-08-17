import { Component, EventEmitter, Inject, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent  implements OnInit{

  onEmitStatusChange = new EventEmitter();
  details : any ={};

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
     public themeService : ThemeService) {}

  ngOnInit() : void{
    if(this.dialogData){
      this.details = this.dialogData;
    }
  }

  handleChangeAction(){
    this.onEmitStatusChange.emit();
  }



}
