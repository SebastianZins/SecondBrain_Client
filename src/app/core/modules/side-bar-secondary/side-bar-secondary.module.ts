import { SideBarSecondaryComponent } from './side-bar-secondary.component';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SideBarSecondaryComponent],
  exports: [SideBarSecondaryComponent],
  imports: [CommonModule, ButtonModule, NgIf, AsyncPipe, TreeModule],
})
export class SideBarSecondaryModule {}
