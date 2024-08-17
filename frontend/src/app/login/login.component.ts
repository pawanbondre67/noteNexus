import { GlobalConstants } from './../shared/global-constants';
import { SnackbarService } from './../services/snackbar/snackbar.service';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm : any = FormGroup;
  responseMessage : string = '';

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private userSerivce : UserService,
    private ngxService : NgxUiLoaderService,
    private snackbarService : SnackbarService,
    public themeService : ThemeService
  ) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['' , [ Validators.required, Validators.pattern(GlobalConstants.emailRegex) ]],
      password: ['' , [ Validators.required, Validators.minLength(4) ]]
    });
  }

  handlesubmit() {
    this.ngxService.start();
     var formData = this.loginForm.value;
     var data = {
        email: formData.email,
        password: formData.password
      };

      this.userSerivce.login(data).subscribe((response : any) => {
        this.ngxService.stop();
        if (response.token) { // Check for token in response
          localStorage.setItem('token', response.token);
          this.router.navigate(['/notenexus/layout']);
        } else {
          console.error("Login response missing token.");
          this.responseMessage = "Login failed. Please try again.";
        }
      }, (error) => {
        console.log(error);
        this.ngxService.stop();

        if(error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericErrorMessage
        }
      }
    );
  }


  onBack(){
    this.router.navigate(['/']);
  }

}
