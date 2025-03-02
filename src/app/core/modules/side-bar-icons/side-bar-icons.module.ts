import { SideBarIconsComponent } from './side-bar-icons.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SideBarIconsComponent],
  imports: [CommonModule, ButtonModule],
  exports: [SideBarIconsComponent],
})
export class SideBarIconsModule {}
