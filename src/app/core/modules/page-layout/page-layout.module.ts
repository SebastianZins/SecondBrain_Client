import { SideBarSecondaryModule } from '../side-bar-secondary/side-bar-secondary.module';
import { SideBarIconsModule } from '../side-bar-icons/side-bar-icons.module';
import { SideBarMainModule } from '../side-bar-main/side-bar-main.module';
import { FooterBarModule } from '../footer-bar/footer-bar.module';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { PageLayoutComponent } from './page-layout.component';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [PageLayoutComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    SideBarMainModule,
    SideBarIconsModule,
    SideBarSecondaryModule,
    FooterBarModule,
    NgIf,
    AsyncPipe,
  ],
  exports: [PageLayoutComponent],
})
export class PageLayoutModule {}
