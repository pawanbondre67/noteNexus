import { MaterialModule } from './shared/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './services/interceptor/token.interceptor';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';




const ngxUiLoaderConfig : NgxUiLoaderConfig = {
  text : 'Loading...',
  textColor : 'white',
  textPosition : 'center-center',
  pbColor : 'white',
  bgsColor : 'white',
  fgsColor : 'white',
  fgsType : SPINNER.ballSpinClockwise,
  fgsSize : 75
  // pbDirection : PB_DIRECTION.leftToRight,
  // pbThickness : 5

};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticleDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    QuillModule.forRoot(),
    SharedModule

  ],
  providers: [
    provideAnimationsAsync(),
    HttpClientModule ,
   {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
