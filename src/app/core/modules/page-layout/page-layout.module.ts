import { SideBarSecondaryModule } from '../side-bar-secondary/side-bar-secondary.module';
import { SideBarIconsModule } from '../side-bar-icons/side-bar-icons.module';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { SideBarMainModule } from '../side-bar-main/side-bar-main.module';
import { FooterBarModule } from '../footer-bar/footer-bar.module';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { TopBarModule } from '../top-bar/top-bar.module';
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
    TopBarModule,
    FooterBarModule,
    NgIf,
    AsyncPipe,
  ],
  exports: [PageLayoutComponent],
})
export class PageLayoutModule {}
