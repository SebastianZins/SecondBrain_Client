import { PageLayoutModule } from './core/modules/page-layout/page-layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { appConfig } from './app.config';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PageLayoutModule],
  providers: appConfig.providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
